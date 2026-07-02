using Microsoft.EntityFrameworkCore;
using Lab4_InsertData;

Console.WriteLine("=== Lab 4: Inserting Data into Database ===");
Console.WriteLine("");

using var context = new AppDbContext();

// Create database if not exists
await context.Database.EnsureCreatedAsync();

// Step 1 - Insert Categories
Console.WriteLine("Inserting Categories...");
var electronics = new Category { Name = "Electronics" };
var groceries = new Category { Name = "Groceries" };

await context.Categories.AddRangeAsync(electronics, groceries);

// Step 2 - Insert Products
Console.WriteLine("Inserting Products...");
var product1 = new Product { Name = "Laptop", Price = 75000, Category = electronics };
var product2 = new Product { Name = "Rice Bag", Price = 1200, Category = groceries };

await context.Products.AddRangeAsync(product1, product2);

// Step 3 - Save to Database
await context.SaveChangesAsync();
Console.WriteLine("");
Console.WriteLine("✅ Categories inserted successfully!");
Console.WriteLine("✅ Products inserted successfully!");
Console.WriteLine("✅ Data saved to database!");
Console.WriteLine("");

// Step 4 - Verify Data
Console.WriteLine("=== Verifying Inserted Data ===");
Console.WriteLine("");

var allCategories = await context.Categories.ToListAsync();
Console.WriteLine("Categories in Database:");
foreach (var cat in allCategories)
{
    Console.WriteLine($"  ID: {cat.Id} | Name: {cat.Name}");
}

Console.WriteLine("");
var allProducts = await context.Products.ToListAsync();
Console.WriteLine("Products in Database:");
foreach (var prod in allProducts)
{
    Console.WriteLine($"  ID: {prod.Id} | Name: {prod.Name} | Price: {prod.Price}");
}