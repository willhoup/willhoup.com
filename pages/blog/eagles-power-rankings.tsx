/** start metadata
title: The rise and fall of the Philadelphia Eagles (and hopeful rise again)
date: June 25, 2017
end metadata **/

import { useEffect, useState, MouseEvent, ReactNode } from "react";
import Head from "../../components/Head";
import * as data from "../api/eagles";
import ExternalLink from "../../components/ExternalLink";
import BlogHeader from "../../components/BlogHeader";
import { line, curveMonotoneX as curve } from "d3-shape";
import { scaleLinear, scaleBand } from "d3-scale";
import { clientPoint } from "d3-selection";

const margin = 20;
const maxWidth = 850;

interface PositionState {
  x: number | null;
  y: number | null;
}

interface WeekProps {
  week: string;
  rank: number;
}

const metadata = {
  title:
    "The rise and fall of the Philadelphia Eagles (and hopeful rise again)",
  date: "June 25, 2017",
};

export default function Eagles() {
  const [ww, setWidth] = useState(0);
  const [position, setPosition] = useState<PositionState>({ x: null, y: null });
  const [isVisible, setVisible] = useState(false);
  const isMobile = ww < 740;
  const isTiny = ww < 350;
  const cols = isTiny ? 1 : isMobile ? 2 : 3;
  const width = ww / cols;
  const height = width * (isMobile ? 0.5 : 0.35);

  const x = scaleBand()
    .range([0, width - margin * 2])
    .domain(
      Object.keys(data.weekOverWeek[0]).filter((d) => d.includes("week"))
    );

  const y = scaleLinear()
    .range([0, height - margin * 2])
    .domain([1, 32]);

  const path = line<WeekProps>()
    .x((d) => x(d.week))
    .y((d) => y(d.rank))
    .curve(curve);

  const weeks = Object.keys(data.weekOverWeek[0]).filter((d) =>
    d.includes("week")
  );

  const eachBand = x.step();
  const index = Math.round(position.x / eachBand);

  useEffect(() => {
    const ww = Math.min(maxWidth, window.innerWidth - 32);
    setWidth(ww);
  }, []);

  function handleMouseMove(event: MouseEvent<SVGRectElement>) {
    const [x, y] = clientPoint(event.currentTarget, event);
    setPosition({ x, y });
  }

  const handleMouseOut = () => setVisible(false);
  const handleMouseOver = () => setVisible(true);

  return (
    <div className="container">
      <Head
        url="http://willhoup.com/blog/eagles-power-rankings/"
        og_title="The rise and fall of the Philadelphia Eagles (and hopeful rise again)"
        title="The rise and fall of the Philadelphia Eagles (and hopeful rise again)"
        description="The early 2000s were the best time to be an Eagles fan. And here are Philadelphia's continuously dropping power rankings to prove it."
      />

      <main>
        <article>
          <BlogHeader
            title={metadata.title}
            byline="Will Houp"
            date={metadata.date}
            updated_at="July 3, 2020"
            note={
              <p>
                I had no idea when I wrote this the summer of 2017 that the
                Eagles would in fact win the Super Bowl in the following season
                (obviously no coincidence).
              </p>
            }
          />
          <p>
            The early 2000s were the best time to be a Philadelphia Eagles fan
            for{" "}
            <ExternalLink href="http://www.nfl.com/videos/nfl-videos/09000d5d825e17ea/TDIF-Eagles-convert-4th-and-26">
              a number of reasons
            </ExternalLink>
            . Here's another{" "}
            <ExternalLink href="https://www.youtube.com/watch?v=Uh7s1cRTMgA">
              one
            </ExternalLink>
            . Can't forget{" "}
            <ExternalLink href="https://www.youtube.com/watch?v=DK52RekqshU">
              this either
            </ExternalLink>
            . We fielded one of the most{" "}
            <ExternalLink href="http://www.footballoutsiders.com/stats/teamdef2001">
              efficient defenses
            </ExternalLink>{" "}
            and{" "}
            <ExternalLink href="https://www.youtube.com/watch?v=PUJv4VwM5qY">
              Donovan McNabb was lit
            </ExternalLink>
            .
          </p>

          <p>
            Quick roundup: Played in four NFC championship title games straight,
            a Super Bowl and pretty much hosted{" "}
            <ExternalLink href="https://en.wikipedia.org/wiki/2005_Pro_Bowl">
              2004's Pro Bowl
            </ExternalLink>
            . Yes, we lost all of those except one NFC championship, but we were
            top dogs in the conference and the NFL.
          </p>

          <p>
            The Five Years of Plenty with the{" "}
            <ExternalLink href="http://media.lehighvalleylive.com/sports_impact/photo/donovan-mcnabb-7a5c4a31b7cac14d_large.jpg">
              One Good Emperor
            </ExternalLink>{" "}
            (botched attempt at referencing{" "}
            <ExternalLink href="https://www.britannica.com/topic/Five-Good-Emperors">
              this
            </ExternalLink>
            ) gave way to much more uncertain times, though. And while the
            Eagles still put together winning records and deep playoff runs, we
            lost elite status.
          </p>

          <div className="twitter-embed">
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                that makes no sense.{" "}
                <ExternalLink href="https://twitter.com/hashtag/Eagles?src=hash">
                  #Eagles
                </ExternalLink>
              </p>
              &mdash; Will Houp (@williamhoup){" "}
              <ExternalLink href="https://twitter.com/williamhoup/status/673647596536127488">
                December 6, 2015
              </ExternalLink>
            </blockquote>
            <script
              async
              src="//platform.twitter.com/widgets.js"
              charSet="utf-8"
            ></script>
          </div>

          <p>
            We beat teams we were better than and suffered against the league's
            juggernaut de jure.
          </p>

          <p>
            To chronicle this change in power, which at times felt like falling
            off a cliff but mostly just a continuous drift away from the dock,
            I've built the charts below. These are the weekly{" "}
            <ExternalLink href="http://www.espn.com/nfl/team/rankings/trended/_/name/phi/philadelphia-eagles#">
              power rankings from ESPN
            </ExternalLink>
            . Data only goes back to 2002.
          </p>

          <svg
            style={{
              visibility: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            width={width}
            height={height - margin * 2}
          >
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="linear-gradient"
                x1="0%"
                x2="0%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#001f3f" />
                <stop offset="50%" stopColor="#001f3f" />
                <stop offset="50%" stopColor="#FF851B" />
                <stop offset="100%" stopColor="#FF851B" />
              </linearGradient>
            </defs>
          </svg>

          <section className="big">
            <div className="standout">
              <svg style={{ marginBottom: 16 }} width={width} height={height}>
                <g transform={`translate(${[margin, margin]})`}>
                  <text fontSize="12" dy="-.9em" y={y(1)}>
                    Historical average
                  </text>

                  <rect
                    onMouseOver={handleMouseOver}
                    onMouseMove={handleMouseMove}
                    onMouseOut={handleMouseOut}
                    pointerEvents="all"
                    x={x("week 1")}
                    y={y(1)}
                    width={x("week 18")}
                    height={y(32)}
                    fill="none"
                  />

                  <g>
                    <line
                      stroke="#000"
                      strokeWidth=".25"
                      x1={0}
                      x2={x("week 18")}
                      y1={y(1)}
                      y2={y(1)}
                    />

                    <text
                      y={y(1)}
                      x={x("week 1")}
                      fontSize="10"
                      textAnchor="end"
                      dy=".35em"
                      dx="-.35em"
                    >
                      1
                    </text>

                    <text
                      y={y(16)}
                      x={x("week 1")}
                      fontSize="10"
                      textAnchor="end"
                      dy=".35em"
                      dx="-.35em"
                    >
                      16
                    </text>
                  </g>

                  <path
                    className="path"
                    strokeDasharray="5,5"
                    stroke="#000"
                    d={path(
                      weeks.map((week): WeekProps => ({ week, rank: 16 }))
                    )}
                  />

                  <path
                    className="path ranking"
                    stroke="url(#linear-gradient)"
                    d={path(
                      data.historical.map(
                        (d, i): WeekProps => ({
                          week: weeks[i],
                          rank: d[weeks[i]],
                        })
                      )
                    )}
                  />

                  <g>
                    <line
                      stroke="#000"
                      strokeWidth=".25"
                      x1={0}
                      x2={x("week 18")}
                      y1={y(32)}
                      y2={y(32)}
                    />
                    {weeks
                      .filter((d, i) => i % (isMobile ? 3 : 2) === 0)
                      .map(
                        (week): ReactNode => (
                          <text
                            key={week}
                            dy="1.35em"
                            fontSize="10"
                            textAnchor="middle"
                            y={y(32)}
                            x={x(week)}
                          >
                            {week.slice(week.indexOf(" "))}
                          </text>
                        )
                      )}
                  </g>

                  {isVisible && (
                    <g>
                      <text
                        y={y(
                          data.historical[weeks.length - 1][
                            weeks[weeks.length - 1]
                          ]
                        )}
                        dy=".35em"
                        x={x("week 18")}
                        dx=".35em"
                        fontSize="10"
                        textAnchor="start"
                      >
                        {data.historical[index][weeks[index]]}
                      </text>

                      <line
                        x1={position.x}
                        x2={position.x}
                        y1={y(1)}
                        y2={y(32)}
                        stroke="#000"
                        strokeWidth=".75"
                      />
                    </g>
                  )}
                </g>
              </svg>
            </div>

            {data.weekOverWeek.map(
              (d): ReactNode => {
                const hoverRank: string = d[weeks[index]];

                return (
                  <svg key={d.year} width={width} height={height}>
                    <g transform={`translate(${[margin, margin]})`}>
                      <rect
                        onMouseOver={handleMouseOver}
                        onMouseMove={handleMouseMove}
                        onMouseOut={handleMouseOut}
                        pointerEvents="all"
                        x={x("week 1")}
                        y={y(1)}
                        width={x("week 18")}
                        height={y(32)}
                        fill="none"
                      />
                      <text fontSize="12" dy="-.9em" y={y(1)}>
                        {d.year}
                      </text>

                      <path
                        className="path"
                        strokeDasharray="5,5"
                        stroke="#000"
                        d={path(
                          weeks.map((week): WeekProps => ({ week, rank: 16 }))
                        )}
                      />

                      <path
                        className="ranking path"
                        d={path(
                          weeks.map(
                            (week): WeekProps => ({ week, rank: d[week] })
                          )
                        )}
                        stroke="url(#linear-gradient)"
                      />

                      <line
                        stroke="#000"
                        strokeWidth=".25"
                        x1={0}
                        x2={x("week 18")}
                        y1={y(32)}
                        y2={y(32)}
                      />

                      {isVisible && (
                        <g>
                          <text
                            y={y(d[weeks[weeks.length - 1]])}
                            dy=".35em"
                            dx=".35em"
                            // x={position.x}
                            x={x("week 18")}
                            fontSize="10"
                            textAnchor="start"
                          >
                            {hoverRank}
                          </text>

                          <line
                            x1={position.x}
                            x2={position.x}
                            y1={y(1)}
                            y2={y(32)}
                            stroke="#000"
                            strokeWidth=".75"
                          />
                        </g>
                      )}
                    </g>
                  </svg>
                );
              }
            )}
          </section>

          <p>
            Where’s the silver lining in a continually dropping power ranking?
            One immediate answer is if you control for anomalies, the Eagles
            actually produced a high level of football play. Only four of the 15
            seasons were losing ones and two of those were really bad finishes,
            not just pretty bad finishes. But if wishes were fishes, amiright?
          </p>

          <p>
            So a non-blissful answer really sits in a few insights from the
            data. The Eagles tend to begin the season stronger than they end it.
            The historical start is No. 9. The historical finish is No. 12. Look
            at 2005, 2007, 2012, 2015 – even 2009. A projected top 10 team that
            often recedes into the average isn’t awesome. It is indicative of
            that paper tiger feel that followed Andy Reid after Super Bowl 39
            and came to define McNabb’s Middle Empire. But 2016 was different.
            We finished two spots higher than we started. Didn’t cover the
            3-point spread set by the average. But we were given a dismal base
            and were able to say “hey, we’re a little better than that.”
          </p>

          <p>
            And our ranking last year was volatile. We crept into the top 10 on
            four occasions. For a kind of sucky team, I think that shows flashes
            of what could be. Now, I’m probably suffering from an
            optimism-over-confidence bias here. But the inconsistency of our
            game is more of a positive wild card considering how poor our
            initial and final spots were.
          </p>

          <p>
            Lastly, I would say that as bad seasons go, our breaks into the top
            10 and ending stronger than we started were bright spots
            non-existent throughout the other dreadful years. Some seasons, like
            2012, we began at No. 7 and fell to No. 29 by our last loss to the
            Giants. In 2015, we broke the average twice and peaked at No. 9, but
            the rest of the year was underwater. 2011 started hot and fizzled
            out. There was a late run, but our hole was too deep. Everyone
            either got hurt or embroiled in a contact fight for 2005. So there’s
            a degree of 2016 that is counting our blessings for calm moments in
            the storm, which weren’t evident during other losing years.
          </p>
          <p>
            So this point is basically saying that the earlier two points should
            be a point. Sorta meta, ya know … or lazy. EITHER WAY IT STANDS.
          </p>
        </article>
      </main>

      <style jsx>{`
        .path {
          fill: none;
          stroke-width: 0.25;
        }

        path,
        text,
        line {
          pointer-events: none;
        }

        .path.historical {
          stroke-width: 0.5;
        }

        .path.ranking {
          stroke-width: 1;
        }

        .twitter-embed {
          margin: 24px 0px;
        }

        .standout {
          margin: 0px auto 16px;
          width: ${width};
          flex-basis: 100%;
          display: flex;
          justify-content: center;
        }

        section.big {
          max-width: ${maxWidth}px;
          margin: 32px auto;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        section.big svg {
          margin: 2px 0px;
        }

        p,
        h1,
        .twitter-embed {
          max-width: 550px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
}
