USE [KnilaDB]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__states__country___1920BF5C]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblStates]'))
ALTER TABLE [dbo].[tblStates] DROP CONSTRAINT [FK__states__country___1920BF5C]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__contacts__state___1DE57479]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblContacts]'))
ALTER TABLE [dbo].[tblContacts] DROP CONSTRAINT [FK__contacts__state___1DE57479]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__contacts__countr__1ED998B2]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblContacts]'))
ALTER TABLE [dbo].[tblContacts] DROP CONSTRAINT [FK__contacts__countr__1ED998B2]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__contacts__city_i__1CF15040]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblContacts]'))
ALTER TABLE [dbo].[tblContacts] DROP CONSTRAINT [FK__contacts__city_i__1CF15040]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__cities__state_id__1A14E395]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblCities]'))
ALTER TABLE [dbo].[tblCities] DROP CONSTRAINT [FK__cities__state_id__1A14E395]
GO
/****** Object:  Index [UQ__tblUsers__FE76F85338CC46CB]    Script Date: 10/8/2023 9:30:55 PM ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[tblUsers]') AND name = N'UQ__tblUsers__FE76F85338CC46CB')
ALTER TABLE [dbo].[tblUsers] DROP CONSTRAINT [UQ__tblUsers__FE76F85338CC46CB]
GO
/****** Object:  Table [dbo].[tblUsers]    Script Date: 10/8/2023 9:30:55 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblUsers]') AND type in (N'U'))
DROP TABLE [dbo].[tblUsers]
GO
/****** Object:  Table [dbo].[tblStates]    Script Date: 10/8/2023 9:30:55 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblStates]') AND type in (N'U'))
DROP TABLE [dbo].[tblStates]
GO
/****** Object:  Table [dbo].[tblCountries]    Script Date: 10/8/2023 9:30:55 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblCountries]') AND type in (N'U'))
DROP TABLE [dbo].[tblCountries]
GO
/****** Object:  Table [dbo].[tblContacts]    Script Date: 10/8/2023 9:30:55 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblContacts]') AND type in (N'U'))
DROP TABLE [dbo].[tblContacts]
GO
/****** Object:  Table [dbo].[tblCities]    Script Date: 10/8/2023 9:30:55 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblCities]') AND type in (N'U'))
DROP TABLE [dbo].[tblCities]
GO
/****** Object:  Table [dbo].[tblAuthTokens]    Script Date: 10/8/2023 9:30:55 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblAuthTokens]') AND type in (N'U'))
DROP TABLE [dbo].[tblAuthTokens]
GO
/****** Object:  Table [dbo].[tblAuthTokens]    Script Date: 10/8/2023 9:30:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblAuthTokens]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tblAuthTokens](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[usr_id] [int] NOT NULL,
	[refresh_token] [varchar](500) NOT NULL,
	[exp_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblCities]    Script Date: 10/8/2023 9:30:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblCities]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tblCities](
	[city_id] [int] NOT NULL,
	[city_name] [nvarchar](100) NULL,
	[state_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[city_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[tblContacts]    Script Date: 10/8/2023 9:30:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblContacts]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tblContacts](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[first_name] [nvarchar](50) NULL,
	[last_name] [nvarchar](50) NULL,
	[email] [varchar](150) NULL,
	[phone_number] [varchar](20) NULL,
	[address] [nvarchar](250) NULL,
	[city_id] [int] NULL,
	[state_id] [int] NULL,
	[country_id] [int] NULL,
	[postal_code] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tblCountries]    Script Date: 10/8/2023 9:30:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblCountries]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tblCountries](
	[country_id] [int] NOT NULL,
	[country_name] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[country_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[tblStates]    Script Date: 10/8/2023 9:30:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblStates]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tblStates](
	[state_id] [int] NOT NULL,
	[state_name] [nvarchar](100) NULL,
	[country_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[state_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[tblUsers]    Script Date: 10/8/2023 9:30:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tblUsers]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[tblUsers](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[full_name] [nvarchar](200) NOT NULL,
	[usr_name] [nvarchar](250) NOT NULL,
	[usr_password] [varchar](250) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[tblAuthTokens] ON 

GO
INSERT [dbo].[tblAuthTokens] ([id], [usr_id], [refresh_token], [exp_date]) VALUES (127, 1, N'tk9o0qU8BbgajuvAc/d1Azb6fdfgona4QSFSyTyEA2UMk7ScAlsZQSC6nJ8DudF8Ce7NJ2jdBr6vjbFZjJbA0Q==', CAST(N'2023-10-15 15:58:53.017' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[tblAuthTokens] OFF
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (1, N'Argo', 1)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (2, N'Baharak', 1)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (3, N'Khash', 1)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (4, N'Baghran', 2)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (5, N'Dishu', 2)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (6, N'Lashkargah', 2)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (7, N'Visakhapatnam', 3)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (8, N'Guntur', 3)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (9, N'Ahmedabad', 4)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (10, N'Surat', 4)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (11, N'Airdrie', 5)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (12, N'Camrose', 5)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (13, N'Abbotsford', 6)
GO
INSERT [dbo].[tblCities] ([city_id], [city_name], [state_id]) VALUES (14, N'Cranbrook', 6)
GO
SET IDENTITY_INSERT [dbo].[tblContacts] ON 

GO
INSERT [dbo].[tblContacts] ([id], [first_name], [last_name], [email], [phone_number], [address], [city_id], [state_id], [country_id], [postal_code]) VALUES (1, N'Yogesh', N'D', N'yogeshwaran13169@gmail.com', N'9344378113', N'No:5,Aiport', 1, 1, 1, 620007)
GO
SET IDENTITY_INSERT [dbo].[tblContacts] OFF
GO
INSERT [dbo].[tblCountries] ([country_id], [country_name]) VALUES (1, N'Afghanistan')
GO
INSERT [dbo].[tblCountries] ([country_id], [country_name]) VALUES (2, N'India')
GO
INSERT [dbo].[tblCountries] ([country_id], [country_name]) VALUES (3, N'Canada')
GO
INSERT [dbo].[tblStates] ([state_id], [state_name], [country_id]) VALUES (1, N'Badakhshan', 1)
GO
INSERT [dbo].[tblStates] ([state_id], [state_name], [country_id]) VALUES (2, N'Helmand', 1)
GO
INSERT [dbo].[tblStates] ([state_id], [state_name], [country_id]) VALUES (3, N'Andhra Pradesh', 2)
GO
INSERT [dbo].[tblStates] ([state_id], [state_name], [country_id]) VALUES (4, N'Gujarat', 2)
GO
INSERT [dbo].[tblStates] ([state_id], [state_name], [country_id]) VALUES (5, N'Alberta', 3)
GO
INSERT [dbo].[tblStates] ([state_id], [state_name], [country_id]) VALUES (6, N'British Columbia', 3)
GO
SET IDENTITY_INSERT [dbo].[tblUsers] ON 

GO
INSERT [dbo].[tblUsers] ([id], [full_name], [usr_name], [usr_password]) VALUES (1, N'Yogesh Waran D', N'yogesh123@gmail.com', N'vwS/98K9VIusFZIN/rnv4hpR6CLlqX4BOFWXWiBJTmM=')
GO
SET IDENTITY_INSERT [dbo].[tblUsers] OFF
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ__tblUsers__FE76F85338CC46CB]    Script Date: 10/8/2023 9:30:55 PM ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[tblUsers]') AND name = N'UQ__tblUsers__FE76F85338CC46CB')
ALTER TABLE [dbo].[tblUsers] ADD UNIQUE NONCLUSTERED 
(
	[usr_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__cities__state_id__1A14E395]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblCities]'))
ALTER TABLE [dbo].[tblCities]  WITH CHECK ADD FOREIGN KEY([state_id])
REFERENCES [dbo].[tblStates] ([state_id])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__contacts__city_i__1CF15040]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblContacts]'))
ALTER TABLE [dbo].[tblContacts]  WITH CHECK ADD FOREIGN KEY([city_id])
REFERENCES [dbo].[tblCities] ([city_id])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__contacts__countr__1ED998B2]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblContacts]'))
ALTER TABLE [dbo].[tblContacts]  WITH CHECK ADD FOREIGN KEY([country_id])
REFERENCES [dbo].[tblCountries] ([country_id])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__contacts__state___1DE57479]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblContacts]'))
ALTER TABLE [dbo].[tblContacts]  WITH CHECK ADD FOREIGN KEY([state_id])
REFERENCES [dbo].[tblStates] ([state_id])
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK__states__country___1920BF5C]') AND parent_object_id = OBJECT_ID(N'[dbo].[tblStates]'))
ALTER TABLE [dbo].[tblStates]  WITH CHECK ADD FOREIGN KEY([country_id])
REFERENCES [dbo].[tblCountries] ([country_id])
GO
