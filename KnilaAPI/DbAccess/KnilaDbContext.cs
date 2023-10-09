using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace KnilaAPI.DbAccess;

public partial class KnilaDbContext : DbContext
{
    public KnilaDbContext()
    {
    }

    public virtual DbSet<TblAuthToken> TblAuthTokens { get; set; }

    public virtual DbSet<TblCity> TblCities { get; set; }

    public virtual DbSet<TblContact> TblContacts { get; set; }

    public virtual DbSet<TblCountry> TblCountries { get; set; }

    public virtual DbSet<TblState> TblStates { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=L-ID-063;Database=KnilaDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblAuthToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblAuthT__3213E83FBB058C4B");

            entity.ToTable("tblAuthTokens");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ExpDate)
                .HasColumnType("datetime")
                .HasColumnName("exp_date");
            entity.Property(e => e.RefreshToken)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("refresh_token");
            entity.Property(e => e.UsrId).HasColumnName("usr_id");
        });

        modelBuilder.Entity<TblCity>(entity =>
        {
            entity.HasKey(e => e.CityId).HasName("PK__cities__031491A80045F28E");

            entity.ToTable("tblCities");

            entity.Property(e => e.CityId)
                .ValueGeneratedNever()
                .HasColumnName("city_id");
            entity.Property(e => e.CityName)
                .HasMaxLength(100)
                .HasColumnName("city_name");
            entity.Property(e => e.StateId).HasColumnName("state_id");

            entity.HasOne(d => d.State).WithMany(p => p.TblCities)
                .HasForeignKey(d => d.StateId)
                .HasConstraintName("FK__cities__state_id__1A14E395");
        });

        modelBuilder.Entity<TblContact>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__contacts__3213E83F5EAA85E6");

            entity.ToTable("tblContacts");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(250)
                .HasColumnName("address");
            entity.Property(e => e.CityId).HasColumnName("city_id");
            entity.Property(e => e.CountryId).HasColumnName("country_id");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.PostalCode).HasColumnName("postal_code");
            entity.Property(e => e.StateId).HasColumnName("state_id");

            entity.HasOne(d => d.City).WithMany(p => p.TblContacts)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("FK__contacts__city_i__1CF15040");

            entity.HasOne(d => d.Country).WithMany(p => p.TblContacts)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK__contacts__countr__1ED998B2");

            entity.HasOne(d => d.State).WithMany(p => p.TblContacts)
                .HasForeignKey(d => d.StateId)
                .HasConstraintName("FK__contacts__state___1DE57479");
        });

        modelBuilder.Entity<TblCountry>(entity =>
        {
            entity.HasKey(e => e.CountryId).HasName("PK__countrie__7E8CD055686EABD1");

            entity.ToTable("tblCountries");

            entity.Property(e => e.CountryId)
                .ValueGeneratedNever()
                .HasColumnName("country_id");
            entity.Property(e => e.CountryName)
                .HasMaxLength(100)
                .HasColumnName("country_name");
        });

        modelBuilder.Entity<TblState>(entity =>
        {
            entity.HasKey(e => e.StateId).HasName("PK__states__81A4741721B73C9C");

            entity.ToTable("tblStates");

            entity.Property(e => e.StateId)
                .ValueGeneratedNever()
                .HasColumnName("state_id");
            entity.Property(e => e.CountryId).HasColumnName("country_id");
            entity.Property(e => e.StateName)
                .HasMaxLength(100)
                .HasColumnName("state_name");

            entity.HasOne(d => d.Country).WithMany(p => p.TblStates)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK__states__country___1920BF5C");
        });

        modelBuilder.Entity<TblUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tblUsers__3213E83F6E09BD17");

            entity.ToTable("tblUsers");

            entity.HasIndex(e => e.UsrName, "UQ__tblUsers__FE76F85338CC46CB").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FullName)
                .HasMaxLength(200)
                .HasColumnName("full_name");
            entity.Property(e => e.UsrName)
                .HasMaxLength(250)
                .HasColumnName("usr_name");
            entity.Property(e => e.UsrPassword)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("usr_password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
