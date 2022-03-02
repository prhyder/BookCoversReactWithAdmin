CREATE TABLE [dbo].[Genre] (
    [GenreId] INT           IDENTITY (1, 1) NOT NULL,
    [Name]    VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_Genre_1] PRIMARY KEY CLUSTERED ([GenreId] ASC)
);

