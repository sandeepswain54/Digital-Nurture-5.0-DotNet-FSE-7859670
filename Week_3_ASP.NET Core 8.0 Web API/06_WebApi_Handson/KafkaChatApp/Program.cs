using KafkaChatApp;

Console.WriteLine("=== Kafka Chat Application ===");
Console.WriteLine("1 - Start Producer (Send messages)");
Console.WriteLine("2 - Start Consumer (Receive messages)");
Console.Write("Enter choice: ");

var choice = Console.ReadLine();

if (choice == "1")
	await KafkaProducer.StartProducer();
else if (choice == "2")
	KafkaConsumer.StartConsumer();
else
	Console.WriteLine("Invalid choice!");
