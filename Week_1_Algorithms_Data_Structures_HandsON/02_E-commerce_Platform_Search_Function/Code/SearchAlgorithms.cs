namespace SearchAlgorithmExample
{
    public static class SearchAlgorithms
    {
        public static Product LinearSearch(Product[] products, int targetId)
        {
            for (int i = 0; i < products.Length; i++)
            {
                if (products[i].ProductId == targetId)
                {
                    return products[i];
                }
            }
            return null;
        }

        public static Product BinarySearch(Product[] sortedProducts, int targetId)
        {
            int low = 0;
            int high = sortedProducts.Length - 1;

            while (low <= high)
            {
                int mid = low + (high - low) / 2;

                if (sortedProducts[mid].ProductId == targetId)
                {
                    return sortedProducts[mid];
                }
                else if (sortedProducts[mid].ProductId < targetId)
                {
                    low = mid + 1;
                }
                else
                {
                    high = mid - 1;
                }
            }
            return null;
        }
    }
}