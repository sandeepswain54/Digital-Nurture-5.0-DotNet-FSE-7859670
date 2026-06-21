namespace FactoryMethodPatternExample
{
    public abstract class DocumentFactory
    {
        public abstract Document CreateDocument();
    }

    public class WordDocumentFactory : DocumentFactory
    {
        public override Document CreateDocument()
        {
            return new WordDocument();
        }
    }

    public class PdfDocumentFactory : DocumentFactory
    {
        public override Document CreateDocument()
        {
            return new PdfDocument();
        }
    }

    public class ExcelDocumentFactory : DocumentFactory
    {
        public override Document CreateDocument()
        {
            return new ExcelDocument();
        }
    }
}