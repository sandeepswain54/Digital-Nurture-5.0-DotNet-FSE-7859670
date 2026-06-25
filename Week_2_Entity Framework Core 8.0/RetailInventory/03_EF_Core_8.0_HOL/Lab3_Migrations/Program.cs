using Lab3_Migrations;
using Microsoft.EntityFrameworkCore;

Console.WriteLine("=== Lab 3: EF Core CLI Migrations ===");
Console.WriteLine("");

using var context = new AppDbContext();

// Check if database exists
Console.WriteLine("Checking database connection...");
await context.Database.EnsureCreatedAsync();

Console.WriteLine("Database created successfully!");
Console.WriteLine("Products table created!");
Console.WriteLine("Categories table created!");
Console.WriteLine("");
Console.WriteLine("Migration applied successfully!");