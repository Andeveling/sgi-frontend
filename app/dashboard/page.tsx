import { Card } from "flowbite-react";

export default function HomePage() {
  return (
    <div className="p-6">
      <Card>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Card title
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </Card>
    </div>
  );
}
