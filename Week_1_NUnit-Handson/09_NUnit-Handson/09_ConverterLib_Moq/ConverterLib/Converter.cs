namespace ConverterLib
{
    public class Converter
    {
        private readonly IDollarToEuroExchangeRateFeed _exchangeRateFeed;

        public Converter(IDollarToEuroExchangeRateFeed exchangeRateFeed)
        {
            _exchangeRateFeed = exchangeRateFeed;
        }

        public double USDToEuro(double usdAmount)
        {
            double rate = _exchangeRateFeed.GetRate();
            return usdAmount * rate;
        }
    }
}
