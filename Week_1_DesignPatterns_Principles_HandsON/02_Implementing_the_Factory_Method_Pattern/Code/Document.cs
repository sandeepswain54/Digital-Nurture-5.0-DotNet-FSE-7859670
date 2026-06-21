using System;

namespace FactoryMethodPatternExample
{
    public abstract class Document
    {
        public abstract void Open();
        public abstract void Save();
    }

    public class WordDocument : Document
    {
        public override void Open()
        {
            Console.WriteLine("Opening Word document.");
        }

        public override void Save()
        {
            Console.WriteLine("Saving Word document.");
        }
    }

    public class PdfDocument : Document
    {
        public override void Open()
        {
            Console.WriteLine("Opening PDF document.");
        }

        public override void Save()
        {
            Console.WriteLine("Saving PDF document.");
        }
    }

    public class ExcelDocument : Document
    {
        public override void Open()
        {
            Console.WriteLine("Opening Excel document.");
        }

        public override void Save()
        {
            Console.WriteLine("Saving Excel document.");
        }
    }
}