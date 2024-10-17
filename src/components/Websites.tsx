

export default function Websites ({cards}) {
    //Do the query here to dynamically display cards that have "site-name" == card in cards
    
    return (
        <div className="cards-container">
          {/* Static placeholder cards */}
          <div className="card">
            <h3 className="site-name">Google</h3>
            <div className="password-group">
              <div className="input">************</div>
              <button className="button">Copy Plain Text</button>
              <button className="button">Reveal</button>
            </div>
          </div>

          <div className="card">
            <h3 className="site-name">Github</h3>
            <div className="password-group">
              <div className="input">************</div>
              <button className="button">Copy Plain Text</button>
              <button className="button">Reveal</button>
            </div>
          </div>
        </div>
    )

}