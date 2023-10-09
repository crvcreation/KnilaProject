using System;
using System.Collections.Generic;

namespace KnilaAPI.DbAccess;

public partial class TblState
{
    public int StateId { get; set; }

    public string? StateName { get; set; }

    public int? CountryId { get; set; }

    public virtual TblCountry? Country { get; set; }

    public virtual ICollection<TblCity> TblCities { get; set; } = new List<TblCity>();

    public virtual ICollection<TblContact> TblContacts { get; set; } = new List<TblContact>();
}
