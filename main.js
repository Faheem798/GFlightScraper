import { urls } from './utils/data.js';
import { scrapeData } from './scraper/scraper.js';
import { writeToFile } from './fileHandler/fileHandler.js';

async function main() {
  for (const url of urls) {
    try {
      const data = await scrapeData(url);

      const txtContent = `Trip: ${data.origin} to ${data.destination} ${data.price} (${data.duration} DAYS)\n \n` +
        `Departing Flight\n${data.departingFlight.originCode} ${data.departingFlight.departureDate} at ${data.departingFlight.departureTime}\n` +
        `${data.departingFlight.destinationCode} ${data.departingFlight.arrivalDate} at ${data.departingFlight.arrivalTime}\n \n` +
        `Returning Flight\n${data.returningFlight.originCode} ${data.returningFlight.departureDate} at ${data.returningFlight.departureTime}\n` +
        `${data.returningFlight.destinationCode} ${data.returningFlight.arrivalDate} at ${data.returningFlight.arrivalTime}\n \n` +
        `URL: ${url}\n---\n`;

      await writeToFile('flight.txt', txtContent);

      const jsonContent = {
        trips: [
          {
            isExpired: 'false',
            key: `${data.origin}-${data.destination}-${new Date().toISOString()}`,
            createdAt: new Date().toISOString(),
            origin: data.origin,
            destination: data.destination,
            price: data.price,
            duration: data.duration,
            url: url,
            departingFlight: {
              originDeparture: {
                code: data.departingFlight.originCode,
                date: data.departingFlight.departureDate,
                time: data.departingFlight.departureTime,
              },
              originDestination: {
                code: data.departingFlight.destinationCode,
                date: data.departingFlight.arrivalDate,
                time: data.departingFlight.arrivalTime,
              },
            },
            returningFlight: {
              originDeparture: {
                code: data.returningFlight.originCode,
                date: data.returningFlight.departureDate,
                time: data.returningFlight.departureTime,
              },
              originDestination: {
                code: data.returningFlight.destinationCode,
                date: data.returningFlight.arrivalDate,
                time: data.returningFlight.arrivalTime,
              },
            },
          },
        ],
      };

      await writeToFile('flight.json', JSON.stringify(jsonContent, null, 2));
    } catch (error) {
      console.error(`Error processing URL ${url}: ${error.message}`);
    }
  }
}
main();
