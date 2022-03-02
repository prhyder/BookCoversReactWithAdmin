CREATE TABLE [dbo].[Premade] (
    [PremadeId]      INT           IDENTITY (1, 1) NOT NULL,
    [BookCoverId]    INT           NOT NULL,
    [Code]           NVARCHAR (30) NOT NULL,
    [Price]          DECIMAL (18)  NOT NULL,
    [Sold]           BIT           NOT NULL,
    [DisplayInStore] BIT           NOT NULL,
    [PremadeOrder]   INT           NULL,
    [DateAdded]      DATETIME2 (7) NOT NULL,
    [PurchaseDate]   DATETIME2 (7) NULL,
    [SeriesId]       INT           NULL,
    CONSTRAINT [PK_Premade] PRIMARY KEY CLUSTERED ([PremadeId] ASC),
    CONSTRAINT [FK_Premade_BookCover] FOREIGN KEY ([BookCoverId]) REFERENCES [dbo].[BookCover] ([BookCoverId]) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT [FK_Premade_Series] FOREIGN KEY ([SeriesId]) REFERENCES [dbo].[Series] ([SeriesId])
);

