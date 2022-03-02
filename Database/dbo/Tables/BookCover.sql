CREATE TABLE [dbo].[BookCover] (
    [BookCoverId]     INT            IDENTITY (1, 1) NOT NULL,
    [Title]           NVARCHAR (200) NOT NULL,
    [AuthorName]      NVARCHAR (200) NULL,
    [ThumbnailUrl]    NVARCHAR (400) NULL,
    [ImageUrl]        NVARCHAR (400) NULL,
    [PortfolioOrder]  INT            NULL,
    [ShowInPortfolio] BIT            NOT NULL,
    [GenreId]         INT            NULL,
    CONSTRAINT [PK_BookCover_1] PRIMARY KEY CLUSTERED ([BookCoverId] ASC),
    CONSTRAINT [FK_BookCover_Genre] FOREIGN KEY ([GenreId]) REFERENCES [dbo].[Genre] ([GenreId])
);

