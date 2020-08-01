export interface IProjectList {
  name: string;
  url: string;
  date?: string;
  publication?: string;
  assets?: string[];
}

export const ProjectList: IProjectList[] = [
  {
    name: "Public coronavirus case data for the United States",
    url: "https://www.nytimes.com/article/coronavirus-county-data-us.html",
    publication: "The New York Times",
    assets: [],
  },
  {
    name: "Live 2020 Primary Election Results",
    url:
      "https://www.nytimes.com/interactive/2020/03/03/us/elections/results-super-tuesday-primary-election.html",
    publication: "The New York Times",
    assets: [],
  },
  {
    name: "Inequality is an undeniable fact in America",
    url:
      "https://www.cnn.com/interactive/2019/09/politics/inequality-in-america/index.html",
    publication: "CNN",
    date: "Sept. 12, 2019",
    assets: [],
  },
  {
    name:
      "If you want to know who’s most likely to win ‘The Bachelorette,’ look to the numbers",
    url:
      "https://www.cnn.com/interactive/2019/05/entertainment/bachelorette-numbers/index.html",
    publication: "CNN",
    date: "May 20, 2019",
    assets: [],
  },
  {
    name:
      "Horrific deaths, brutal treatment: Mental illness in America’s jails",
    url:
      "https://www.pilotonline.com/projects/jail-crisis/article_5ba8a112-974e-11e8-ba17-b734814f14db.html-2",
    publication: "The Virginian-Pilot",
    date: "Aug. 23, 2018",
    assets: [],
  },
  {
    name:
      "Essentially, a coin flip may determine only 3rd power shift for Virginia House in modern history",
    url:
      "https://pilotonline.com/news/government/politics/virginia/essentially-a-coin-flip-may-determine-only-rd-power-shift/article_10789d91-69c8-5306-9c16-18fd602cc091.html",
    publication: "The Virginian-Pilot",
    date: "Dec. 22, 2017",
  },
];
