# Usage

Select **src**, **alt**, **header**, **articleReleaseDate** (about date: **new Date(2020,11,5,15,5)** format - "YYYY, M, D, H, Min"), select the text of the article.

```HTML

<app-features-shared-news-article [src]="someObj.articleSrc" [alt]="someObj.articleAlt" [header]="someObj.articleHeader" [articleReleaseDate]="someObj.articleReleaseDate">
    {{someObj.articleText}}
 </app-features-shared-news-article>

```

**for visualization**

```HTML
<app-features-shared-news-article [src]="'https://s3-prod.crainsnewyork.com/s3fs-public/1008p2_Wall%20Street%20sign-Main_i.jpg'"
[alt]="'some text'" [header]="'Hopes of trade deal push Wall Street higher'" [articleReleaseDate]="date">
    <p>
        (Reuters) - U.S. stocks rose on Monday, boosted by technology and industrial companies, after
         President Donald Trump said he would delay a planned hike in tariffs on Chinese imports and that he was
          "very, very close" on a trade deal. Trump said on Monday he was optimistic that a final trade deal could
          be reached with China and that he would hold a summit to sign any pact, but cautioned an agreement may still
           not happen.
    </p>
    <br>
<p>
    The U.S. president's move to push the deadline is the clearest sign yet that the two countries are closing in on a deal
     to end their prolonged trade spat, which has slowed global growth and disrupted markets. "Extension of the deadline shows
      that everyone wants to work towards the same goal of reaching a settlement that will help both economies grow,"
      said J.J. Kinahan, chief market strategist at TD Ameritrade in Chicago. "Markets are taking that as a very positive
      sign that fears of a slowdown due to tariffs could hopefully be mitigated."
</p>
<br>
<p>The S&P technology index rose 0.69 percent, with Apple (NASDAQ:AAPL) Inc's 1.1 percent rise leading the gains.
    Rise in chip companies, which have a big exposure to the Chinese market, helped the Philadelphia semiconductor index
    climb 1.20 percent. The tariff-sensitive industrials sector was 0.82 percent higher, helped by Caterpillar (NYSE:CAT)
    Inc's 2.3 percent jump and Boeing (NYSE:BA) Co 0.7 percent rise. Spark Therapeutics shares more than doubled after
    Swiss drugmaker Roche Holding (SIX:ROG) AG agreed to buy the company for $4.3 billion. Canadian miner Barrick Gold
    Corp offered to buy U.S. rival Newmont Mining Corp (NYSE:NEM) for nearly $18 billion</p>
 </app-features-shared-news-article>

```
