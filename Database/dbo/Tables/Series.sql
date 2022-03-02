CREATE TABLE [dbo].[Series] (
    [SeriesId]    INT            IDENTITY (1, 1) NOT NULL,
    [SeriesName]  NVARCHAR (MAX) NULL,
    [SeriesPrice] DECIMAL (18)   NULL,
    CONSTRAINT [PK_Series] PRIMARY KEY CLUSTERED ([SeriesId] ASC)
);

