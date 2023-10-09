using System;
using System.Collections.Generic;

namespace KnilaAPI.DbAccess;

public partial class TblCountry
{
    public int CountryId { get; set; }

    public string? CountryName { get; set; }

    public virtual ICollection<TblContact> TblContacts { get; set; } = new List<TblContact>();

    public virtual ICollection<TblState> TblStates { get; set; } = new List<TblState>();
}
