import $ from 'jquery'
import { useEffect } from 'react'
import Chart, { ChartItem } from 'chart.js/auto'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { Button, DiscordIcon, Flex, GithubIcon, Link, NextLinkFromReactRouter, ResourcesIcon, TelegramIcon, Text, TwitterIcon } from 'components'

const Home: React.FC<React.PropsWithChildren> = () => {
  useEffect(() => {
    function getHeight() {
      return $('.promo').outerHeight()
    }
    $('.scroll-down').on('click', function (e) {
      $('html, body').animate(
        {
          scrollTop: getHeight(),
        },
        10,
      )
    })

    // eslint-disable-next-line no-var, vars-on-top
    var ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-var, vars-on-top
    var myChart = new Chart(ctx as ChartItem, {
      type: 'doughnut',
      data: {
        labels: ['Liquidity Incentives', 'Team', 'Treasury + Marketing', 'Initial Mint'],
        datasets: [
          {
            label: 'Percent of total supply',
            data: [89, 5, 5, 1],
            backgroundColor: ['#01F4FF', '#2ACCFE', '#43B3FD', '#6F87FC'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          arc: {
            borderColor: '#1f2641',
            borderWidth: 2,
          },
        },
      },
    })
    return () => {
      myChart.destroy()
    }
  })
  return (
    <>
      <section className="promo">
        <div className="container">
          <div className="row">
            <div className="col-12 promo__content" data-aos="fade-right">
              <h1>
                Dexfinity Just Entered <span>on Bitfinity Network</span>
              </h1>
              <p>
                The protocol is implemented as a set of persistent, non-upgradable smart contracts; designed to
                prioritize censorship resistance, security, self-custody, and to function without any trusted
                intermediaries who may selectively restrict access.
              </p>

              {/* <div className="timer-wrap">
                <FlipClockCountdown
                  to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
                  labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                  labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
                  digitBlockStyle={{
                    width: 40,
                    height: 60,
                    fontSize: 30,
                    color: 'black',
                    background: '#fffefc',
                    fontWeight: 700,
                  }}
                  dividerStyle={{ color: 'white', height: 0 }}
                  // separatorStyle={{ color: 'red', size: '6px' }}
                  duration={0.5}
                >
                  Finished
                </FlipClockCountdown>
              </div> */}

              <div className="promo__btns-wrap">
                <Button as={NextLinkFromReactRouter} to="/presale" variant="primary" height="60px" px="25px">
                  <Text color="background">Join in Presale</Text>
                </Button>
                <Button as={NextLinkFromReactRouter} to="https://docs.dexfinity.finance/" target="_blank" variant="secondary" height="60px" ml="12px" px="25px">
                  Documentation
                </Button>
              </div>
            </div>
          </div>
          <img src="images/home/promo-bg.png" data-aos="fade-up" alt="" className="promo__img" />
        </div>
        <div className="scroll-down">
          <img src="images/home/scroll-down.png" alt="" />
        </div>
      </section>
      {/* <section className="economy">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-4">
              <a
                data-jarallax-element="-40"
                href="https://www.youtube.com/watch?v=3cZjVFKzugY&list=PLcpkKchW7Xe5K578xRCwQbPbeVQGN5K9h&index=10"
                className="economy__video-btn video-btn popup-youtube"
              >
                <img src="images/home/video-btn.png" alt="" />
              </a>

              <div className="economy__block">
                <div className="economy__block-content">
                  <div className="section-header section-header--white section-header--tire section-header--small-margin">
                    <h4>decentralised economy</h4>
                    <h2>
                      A peer-to-peer platform <span> designed for exchanging cryptocurrencies</span>
                    </h2>
                  </div>
                  <p>
                  Dexfinity presents itself as a fully developed platform ready to transform the landscape of decentralized exchanges (DEX).
                  Our platform has been designed to directly address the most significant obstacles in the sector, offering a superior trading experience that focuses on cost reduction, ease of use, and future user education.
                  </p>
                  <ul>
                    <li>
                      <span>Low transaction fee: </span> Dexfinity has solved it by implementing its operation on the Bitfinity Network.
                    </li>
                    <li>
                      <span>Attractive design: </span> The platform features a visually attractive and easy-to-navigate interface, designed with the end user in mind.
                    </li>
                    <li>
                      <span>Future educational strategy:</span> We plan to establish a strong presence on social media and video platforms like YouTube, 
                      where we will collaborate with industry influencers to expand our reach.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="images/home/video-bg.png" alt="" className="economy__bg" />
      </section> */}
      <section className="section about" id="about">
        <div className="container">
          <div className="row">
            <div data-aos="fade-right" className="col-lg-5">
              <div className="section-header section-header--animated section-header--tire section-header--small-margin">
                <h4>About DEX</h4>
                <h2>
                  An Innovation Solution <span>for the Challenges of DeFi</span>
                </h2>
              </div>
              <div className="about__animated-content">
                <p>
                  Dexfinity presents itself as a fully developed platform ready to transform the landscape of
                  decentralized exchanges (DEX). Our platform has been designed to directly address the most significant
                  obstacles in the sector, offering a superior trading experience that focuses on cost reduction, ease
                  of use, and future user education.
                </p>
                <ul>
                  <li>Low cost of transactions</li>
                  <li>Attractive and easy-to-navigate interface</li>
                  <li>Future educational strategy</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 align-items-center">
              <img src="images/home/about-img.png" className="about__img img-responsive" alt="" />
            </div>
          </div>
        </div>
        <img src="images/home/about-bg.png" data-jarallax-element="40" alt="" className="about__bg" />
      </section>
      <section className="section section--no-pad-bot services" id="services">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-header section-header--animated section-header--center section-header--medium-margin">
                <h4>Awesome services</h4>
                <h2>Our Products</h2>
              </div>

              <div className="services__items">
                <div className="services__left">
                  <div data-aos="fade-up" className="service">
                    <div className="service__bg type_1" />
                    <img src="images/home/service-icon-4.svg" alt="" />
                    <div className="service__title">Exchange</div>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="200" className="service">
                    <div className="service__bg type_2" />
                    <img src="images/home/service-icon-3.svg" alt="" />
                    <div className="service__title">Liquidity Pool</div>
                  </div>
                </div>
                <div className="services__right">
                  <div data-aos="fade-up" data-aos-delay="400" className="service">
                    <div className="service__bg type_3" />
                    <img src="images/home/service-icon-1.svg" alt="" />
                    <div className="service__title">Farming</div>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="600" className="service">
                    <div className="service__bg type_4" />
                    <img src="images/home/service-icon-2.svg" alt="" />
                    <div className="service__title">Dexfinity Tools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="images/home/services-bg1.png" alt="" className="services__bg" />
        <img src="images/home/services-bg-1.png" className="services__cosmos" alt="" />
      </section>
      <section className="section map" id="map">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-header section-header--animated section-header--center section-header--medium-margin">
                <h4>Our way</h4>
                <h2>Road Map</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-4 col-sm-8 offset-sm-4">
              <div className="road">
                <div className="road__item">
                  <div className="road__item-metka" />
                  <div className="road__item-content">
                    <div className="road__item-title">Nov 2024</div>
                    <p>
                      <ul>
                        <li>Establish initial idea and concept</li>
                        <li>Create a documentation</li>
                        <li>Front end design and development</li>
                        <li>Contract write and unit test</li>
                      </ul>
                    </p>
                  </div>
                </div>

                <div className="road__item road__item-active">
                  <div className="road__item-metka" />
                  <div className="road__item-content">
                    <div className="road__item-title">Dec 2024</div>
                    <p>
                      <ul>
                        <li>Create twitter, telegram channels for marketing</li>
                        <li>KYC</li>
                        <li>Listing on Bitfinity ecosystem</li>
                        <li>Marketing campaign</li>
                      </ul>
                    </p>
                  </div>
                </div>

                <div className="road__item road__item-next">
                  <div className="road__item-metka" />
                  <div className="road__item-content">
                    <div className="road__item-title">Dec 2024</div>
                    <p>
                      <ul>
                        <li>Token deploy and Presale launch</li>
                        <li>Dexfinity Exchange launch</li>
                        <li>Farms and Pools launch</li>
                        <li>Dexfinity Tools launch</li>
                      </ul>
                    </p>
                  </div>
                </div>

                <div className="road__item road__item-next">
                  <div className="road__item-metka" />
                  <div className="road__item-content">
                    <div className="road__item-title">Mar 2025</div>
                    <p>
                      <ul>
                        <li>Token Launchpad</li>
                        <li>AI chatgpt development for education</li>
                        <li>Launch a Dexfinity Analytics</li>
                        <li>Dexfinity API development</li>
                      </ul>
                    </p>
                  </div>
                </div>

                <div className="road__item road__item-next">
                  <div className="road__item-metka" />
                  <div className="road__item-content">
                    <div className="road__item-title">Jun 2025</div>
                    <p>
                      <ul>
                        <li>Launch a Dexfinity V3 swap and liquidity</li>
                        <li>Build a NFT Marketplace</li>
                        <li>Meme market by bonding curve</li>
                        <li>Build a Metaverse development</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="images/home/road_map.png" data-jarallax-element="-40" alt="" className="map__title-bg" />
        </div>
      </section>

      <section className="section cases">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-header section-header--animated section-header--center section-header--medium-margin">
                <h4>Some facts</h4>
                <h2>Use Cases</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col cases__list">
              <div data-aos="fade-right" className="cases__item">
                <img src="images/home/cases-icon-4.png" alt="" className="cases__item-icon" />
                <div className="cases__item-content">
                  <div className="cases__item-title">Exchange</div>
                  <p className="cases__item-text">
                    Token swaps in Dexfinity are a simple way to trade one ERC-20 token for another. Dexfinity uses an
                    automated market maker mechanism to provide instant feedback on rates and slippage.
                  </p>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay="200" className="cases__item">
                <img src="images/home/cases-icon-3.png" alt="" className="cases__item-icon" />
                <div className="cases__item-content">
                  <div className="cases__item-title">Liquidity Pool</div>
                  <p className="cases__item-text">
                    Anyone can become a liquidity provider (LP) for a pool by depositing an equivalent value of each
                    underlying token in return for pool tokens. These tokens track pro-rata LP shares of the total
                    reserves, and can be redeemed for the underlying assets at any time.
                  </p>
                </div>
              </div>
              <div data-aos="fade-right" className="cases__item">
                <img src="images/home/cases-icon-2.png" alt="" className="cases__item-icon" />
                <div className="cases__item-content">
                  <div className="cases__item-title">Farming</div>
                  <p className="cases__item-text">
                    Users play to earn through Farms and Pools which is designed for DEF staking or DEP Lp staking by
                    DEF token to reward.
                  </p>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay="200" className="cases__item">
                <img src="images/home/cases-icon-1.png" alt="" className="cases__item-icon" />
                <div className="cases__item-content">
                  <div className="cases__item-title">Dexfinity Tools</div>
                  <p className="cases__item-text">
                    Dexfinity provides essential tools for crypto users such as Token Creator, Token Multi-sender and
                    Token Locker.
                  </p>
                </div>
              </div>

              {/* <div data-aos="fade-right" className="cases__item">
                <img src="images/home/cases-icon-5.png" alt="" className="cases__item-icon" />
                <div className="cases__item-content">
                  <div className="cases__item-title">Dexfinity</div>
                  <p className="cases__item-text">
                    Clownfish catfish antenna codlet alfonsino squirrelfish deepwater flathead sea lamprey. Bombay duck
                    sand goby snake mudhead
                  </p>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay="200" className="cases__item">
                <img src="images/home/cases-icon-6.png" alt="" className="cases__item-icon" />
                <div className="cases__item-content">
                  <div className="cases__item-title">Dexfinity App</div>
                  <p className="cases__item-text">
                    Asiatic glassfish pilchard sandburrower, orangestriped triggerfish hamlet Molly Miller trunkfish
                    spiny dogfish!
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="row">
            <Flex justifyContent="center" width="100%">
              <Button as={NextLinkFromReactRouter} to="/swap" variant="primary" height="60px" px="25px">
                <Text color="background">Enter App</Text>
              </Button>
            </Flex>
          </div>
        </div>
        <img src="images/home/cases-bg.png" className="cases__bg" alt="" />
        <img src="images/home/cases-imgs.png" className="cases__elements" alt="" />
      </section>

      <section className="section token" id="token">
        <div className="container">
          <div className="row">
            <img src="images/home/token-img.png" className="token__img" alt="" />
            <div data-aos="fade-left" className="col-lg-6 offset-lg-6 token__animated-content">
              <div className="section-header section-header--tire section-header--small-margin">
                <h4>About token</h4>
                <h2>Token Sale</h2>
              </div>

              <ul className="token__info-list">
                <li>
                  <span>Token name:</span> Dexfinity Token
                </li>
                <li>
                  <span>Token Symbol:</span> DEF
                </li>
                {/* <li>
                  <span>Currency Symbol Image :</span> Currency Symbol Image
                </li> */}
                <li>
                  <span>Max Supply:</span> 100,000,000
                </li>
                <li>
                  <span>Initial Supply:</span> 1,000,000
                </li>
                <li>
                  <span>Initial Price:</span> 10 BTF
                </li>
                <li>
                  <span>Effective Emissions:</span> 1 DEF/second
                </li>
                {/* <li>
                  <span>Minimum Purchase:</span> 100 Dexfinity
                </li> */}
              </ul>

              <div className="token__desc">
                <div className="token__desc-title">General description</div>
                <div className="token__desc-text">
                  <p>At the heart of the Dexfinity ecosystem lies DEF, the main token that powers the platform.</p>
                  <ul>
                    <li>
                      By staking DEF, users can earn 100% of protocol revenue and participate in the governance of
                      Dexfinity
                    </li>
                    <li>Locking or flexibly staking DEF can result in increased earnings of the token</li>
                    <li>Earn DEF by farming and staking</li>
                  </ul>
                </div>
              </div>

              <Button as={NextLinkFromReactRouter} to="/presale" variant="primary" height="60px" px="25px">
                <Text color="background">Buy Token</Text>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="data token-data section section--no-pad-bot">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-header section-header--animated section-header--medium-margin section-header--center">
                <h4>Our data</h4>
                <h2>Token Distribution</h2>
                <div className="bg-title">Token Distribution</div>
              </div>
            </div>
          </div>
          <div className="row chart__row align-items-center">
            <div className="col-lg-6">
              <div className="chart">
                {/* <img className="chart__bg" src="images/home/chart-bg.png" alt="" /> */}
                <div className="chart__wrap">
                  <canvas id="myChart" width="400" height="400" />
                </div>
              </div>
            </div>
            <div data-aos="fade-left" className="col-lg-6 token-data__animated-content">
              <div className="chart__title">Allocation of token supply</div>
              <p className="chart__text">Token Max Supply - 100,000,000</p>
              <ul className="chart__legend">
                <li>
                  <span style={{ width: '289px' }} />
                  89% Liquidity Incentives
                </li>
                <li>
                  <span style={{ width: '18px' }} />
                  5% Team
                </li>
                <li>
                  <span style={{ width: '18px' }} />
                  5% Treasury + Marketing
                </li>
                <li>
                  <span style={{ width: '4px' }} />
                  1% Initial Mint
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-header section-header--center section-header--medium-margin">
                <h4>FAQ</h4>
                <h2>Frequency Asked Questions</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <ul className="accordion">
                <li>
                  <a href="/">What is Dexfinity?</a>
                  <p>
                    The Dexfinity protocol is a peer-to-peer system designed for exchanging cryptocurrencies (ERC-20
                    Tokens) on the Bitfinity Network blockchain. The protocol is implemented as a set of persistent,
                    non-upgradable smart contracts; designed to prioritize censorship resistance, security,
                    self-custody, and to function without any trusted intermediaries who may selectively restrict
                    access.
                  </p>
                </li>
                <li>
                  <a href="/">How Dexfinity works?</a>
                  <p>
                    Dexfinity is an automated liquidity protocol powered by a constant product formula and implemented
                    in a system of non-upgradeable smart contracts on the Bitfinity network. It obviates the need for
                    trusted intermediaries, prioritizing decentralization, censorship resistance, and security.
                  </p>
                </li>
                <li>
                  <a href="/">What is DEF?</a>
                  <p>At the heart of the Dexfinity ecosystem lies DEF, the main token that powers the platform.</p>
                </li>
                <li>
                  <a href="/">How does swap work?</a>
                  <p>
                    Token swaps in Dexfinity are a simple way to trade one ERC-20 token for another. For end-users,
                    swapping is intuitive: a user picks an input token and an output token. They specify an input
                    amount, and the protocol calculates how much of the output token they’ll receive. They then execute
                    the swap with one click, receiving the output token in their wallet immediately.
                  </p>
                </li>
                <li>
                  <a href="/">What is Pools?</a>
                  <p>
                    Each Dexfinity liquidity pool is a trading venue for a pair of ERC20 tokens. When a pool contract is
                    created, its balances of each token are 0; in order for the pool to begin facilitating trades,
                    someone must seed it with an initial deposit of each token. This first liquidity provider is the one
                    who sets the initial price of the pool. They are incentivized to deposit an equal value of both
                    tokens into the pool. To see why, consider the case where the first liquidity provider deposits
                    tokens at a ratio different from the current market rate. This immediately creates a profitable
                    arbitrage opportunity, which is likely to be taken by an external party.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <img className="logo__img logo__img--big" src="/images/logo.png" alt="" />
              <div className="copyright">© 2024, Dexfinity </div>
            </div>
            <div className="col-lg-4">
              <div className="social-block">
                <div className="social-block__title">Stay connected:</div>

                <ul className="social-list">
                  <li className="social-list__item">
                    <a href="https://x.com/xdexfinity" className="social-list__link">
                      {/* <img src="images/home/twitter.png" width={32}/> */}
                      <TwitterIcon />
                    </a>
                  </li>
                  <li className="social-list__item">
                    <a href="https://t.me/DexfinityFinance" className="social-list__link">
                      {/* <img src="images/home/telegram.png" width={32}/> */}
                      <TelegramIcon />
                    </a>
                  </li>
                  <li className="social-list__item" style={{paddingTop: "6px"}}>
                    <a href="https://discord.gg/ySugAwJD7D" className="social-list__link">
                      {/* <img src="images/home/telegram.png" width={32}/> */}
                      <DiscordIcon />
                    </a>
                  </li>
                  <li className="social-list__item">
                    <a href="https://docs.dexfinity.finance" className="social-list__link">
                      {/* <img src="images/home/github.png" width={32}/> */}
                      <ResourcesIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <form action="#" className="form subscribe" id="subscribe-form">
                <div className="form__title">Subscribe</div>
                <div className="form__row">
                  <input type="email" name="subscribe_email" className="form__input" placeholder="Email" />
                  <Button variant="primary" height="55px" px="25px">
                    <Text color="background">Send</Text>
                  </Button>
                  {/* <button className="form__btn btn btn--uppercase btn--orange btn--small">
                    <span>Send</span>
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
