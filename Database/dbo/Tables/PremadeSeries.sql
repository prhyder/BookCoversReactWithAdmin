CREATE TABLE [dbo].[PremadeSeries] (
    [SeriesId]      INT NOT NULL,
    [PremadeId]     INT NOT NULL,
    [OrderInSeries] INT NOT NULL,
    CONSTRAINT [FK_PremadeSeries_Premade] FOREIGN KEY ([PremadeId]) REFERENCES [dbo].[Premade] ([PremadeId]),
    CONSTRAINT [FK_PremadeSeries_Series] FOREIGN KEY ([SeriesId]) REFERENCES [dbo].[Series] ([SeriesId]),
    UNIQUE NONCLUSTERED ([OrderInSeries] ASC)
);

