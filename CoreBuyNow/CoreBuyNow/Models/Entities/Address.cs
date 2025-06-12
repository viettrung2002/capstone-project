using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Address
{
        
    [Key]
     public Guid AddressId { get; set; }
     public Guid UserId { get; set; }
     public Guid ProvinceId { get; set; }
     [JsonIgnore]
     public Province? Province { get; set; }
     public Guid DistrictId { get; set; }
     [JsonIgnore]
     public District? District { get; set; }
     public Guid WardId { get; set; }
     [JsonIgnore]
     public Ward? Ward { get; set; }
     [StringLength(500)]
     public string StreetAddress { get; set; }
     public string Name {set; get;}
     public string PhoneNumber { get; set; }
}
public class Province
{
    public Guid ProvinceId {set;get;}
    public string ProvinceName {set;get;}
}

public class District
{
    public Guid DistrictId {set;get;}
    public string DistrictName {set;get;}
    public Guid ProvinceId {set;get;}
    [JsonIgnore]
    public Province? Province {set;get;}
}

public class Ward
{
    public Guid WardId {set;get;}
    public string WardName {set;get;}
    public Guid DistrictId {set;get;}
    [JsonIgnore]
    public District? District {set;get;}
}

public class ProvinceDto
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("slug")]
    public string Slug { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("name_with_type")]
    public string NameWithType { get; set; }

    [JsonPropertyName("code")]
    public string Code { get; set; }
}

public class DistrictDto
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("slug")]
    public string Slug { get; set; }

    [JsonPropertyName("name_with_type")]
    public string NameWithType { get; set; }

    [JsonPropertyName("path")]
    public string Path { get; set; }

    [JsonPropertyName("path_with_type")]
    public string PathWithType { get; set; }

    [JsonPropertyName("code")]
    public string Code { get; set; }

    [JsonPropertyName("parent_code")]
    public string ParentCode { get; set; } // Tỉnh ID (Province Code)
}
public class WardDto
{
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("slug")]
    public string Slug { get; set; }

    [JsonPropertyName("name_with_type")]
    public string NameWithType { get; set; }

    [JsonPropertyName("path")]
    public string Path { get; set; }

    [JsonPropertyName("path_with_type")]
    public string PathWithType { get; set; }

    [JsonPropertyName("code")]
    public string Code { get; set; }

    [JsonPropertyName("parent_code")]
    public string ParentCode { get; set; } // District Code
}
