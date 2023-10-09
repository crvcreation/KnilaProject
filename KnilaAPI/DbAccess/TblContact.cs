using System;
using System.Collections.Generic;

namespace KnilaAPI.DbAccess;

public partial class TblContact
{
    public long Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public int? CityId { get; set; }

    public int? StateId { get; set; }

    public int? CountryId { get; set; }

    public long? PostalCode { get; set; }

    public virtual TblCity? City { get; set; }

    public virtual TblCountry? Country { get; set; }

    public virtual TblState? State { get; set; }
}
