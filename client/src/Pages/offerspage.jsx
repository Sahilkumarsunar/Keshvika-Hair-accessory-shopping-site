import React from "react";
import "./offerspage.css";

const offers = [
  {
    id: 1,
    title: "Festive Discount - 25% Off",
    subtitle: "On all silk scrunchies",
    description: "Limited time festival offer. Free gift wrapping on orders above ₹999.",
    image: "../components/assets/scrunchie1.jpg",
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    subtitle: "For hair bows & clips",
    description: "Mix-and-match across categories. Best for party-ready sets.",
    image: "/assets/bow1.jpg",
  },
  {
    id: 3,
    title: "Flat ₹200 Off",
    subtitle: "On orders above ₹2000",
    description: "Stackable with some promotional codes. T&Cs apply.",
    image: "/assets/scrunchie3.jpg",
  },
];

export default function offerspage() {
  return (
    <main className="offer-page">
      <header className="offer-hero">
        <div className="offer-hero-content">
          <h1>Special Offers</h1>
          <p>Handpicked deals to style your celebrations. Limited stock — choose quickly.</p>
        </div>
      </header>

      <section className="offer-cards">
        {offers.map((o) => (
          <article key={o.id} className="offer-card">
            <div className="offer-image-wrapper">
              <img src={o.image} alt={o.title} />
            </div>
            <div className="offer-body">
              <h2>{o.title}</h2>
              <h3>{o.subtitle}</h3>
              <p className="offer-desc">{o.description}</p>
            </div>
            <div className="offer-footer">
              <span className="offer-price">{o.priceText}</span>
              <button
                className="btn-primary"
                onClick={() => {
                  window.location.href = "/shop";
                }}
              >
                Shop Now
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="offer-cta">
        <div className="cta-inner">
          <h2>Not sure what to pick?</h2>
          <p>Contact our style team for personalized bundles and gift recommendations.</p>
          <a className="btn-outline" href="/contact">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
