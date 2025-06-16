public class ProductResponseDto {
    public Guid ProductId {set; get;}
    public string ProductName {set; get;}
    public string SubCategoryName {set; get;}
    public string MainImage {set; get;}
    public int Rating {set; get;}
    public int Sold {set; get;}
    public int Discount {set; get;}
    public int ReviewCount {set; get;}
    public decimal Price {set; get;}
    public int Inventory {set; get;}
    public int Like  {set; get;}
}

public class ProductInfoResponseDto
{
     
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public Guid SubCategoryId { get; set; }
        public string CategoryName { get; set; }
        public int Like { get; set; } 
        public Guid ShopId { get; set; }
        public string ShopName { get; set; }
        public decimal Price { get; set; }
        public string? MainImage { get; set; }
        public string? ExtraImage { get; set; }
        public int Sold { get; set; }
        public DateTime CreatedDate { get; set; }
       
        public int Rating { get; set; }
        public int Discount { get; set; } = 0;
        public Dictionary<string, string> Specifications { get; set; } = new ();
        public bool IsFlashSale { get; set; }
        public int ReviewCount { get; set; }
        public string? Description { get; set; }
        public int Inventory { get; set; }
    
}
