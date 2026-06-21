using System;
using System.Linq;

namespace SearchAlgorithmExample
{
    class Program
    {
        static void Main(string[] args)
        {
            Product[] products = new Product[]
            {
                new Product(105, "Wireless Mouse", "Electronics"),
                new Product(102, "Office Chair", "Furniture"),
                new Product(110, "Bluetooth Speaker", "Electronics"),
                new Product(101, "Notebook", "Stationery"),
                new Product(107, "Desk Lamp", "Furniture")
            };

            Console.WriteLine("--- Linear Search (unsorted array) ---");
            Product linearResult = SearchAlgorithms.LinearSearch(products, 110);
            Console.WriteLine(linearResult != null
                ? $"Found: {linearResult.ProductName} ({linearResult.Category})"
                : "Product not found.");

            Product[] sortedProducts = products.OrderBy(p => p.ProductId).ToArray();

            Console.WriteLine("\n--- Binary Search (sorted array) ---");
            Product binaryResult = SearchAlgorithms.BinarySearch(sortedProducts, 110);
            Console.WriteLine(binaryResult != null
                ? $"Found: {binaryResult.ProductName} ({binaryResult.Category})"
                : "Product not found.");

            Console.ReadLine();
        }
    }
}