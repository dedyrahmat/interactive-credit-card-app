import { useState, useMemo } from "react";

const CARDS = {
  visa: "^4",
  mastercard: "^5[1-5]",
};

function App() {
  const [cardName, setCardName] = useState("FULL NAME");
  const [cardNumber, setCardNumber] = useState("");

  const checkCardType = (number) => {
    let re;
    for (const [card, pattern] of Object.entries(CARDS)) {
      re = new RegExp(pattern);
      if (number.match(re) !== null) {
        return card;
      }
    }
    return "visa";
  };

  const useCardType = useMemo(() => {
    return checkCardType(cardNumber);
  }, [cardNumber]);

  const onCardNumberChange = (event) => {
    let { value } = event.target;
    let cardNumber = event.target.value;
    value = value.replace(/\D/g, "");
    // if (/^3[47]\d{0,13}$/.test(value)) {
    //   cardNumber = value
    //     .replace(/(\d{4})/, "$1 ")
    //     .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    // } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
    //   // diner's club, 14 digits
    //   cardNumber = value
    //     .replace(/(\d{4})/, "$1 ")
    //     .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    // } else
    if (/^\d{0,16}$/.test(value)) {
      // regular cc number, 16 digits
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
        .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
    }

    setCardNumber(cardNumber.trimRight());
  };

  return (
    <div className="min-h-screen flex flex-wrap flex-col">
      <div className="bg-white rounded w-1/2 left-1/4 top-1/4 absolute p-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="min-w-full h-64 bg-blue-300 rounded p-6 relative">
            {/* <div className="absolute min-w-full h-full overflow-hidden rounded top-0 left-0">
              <img
                src="/bg.png"
                draggable={false}
                className=" block object-cover w-full h-full max-w-full"
              />
            </div> */}
            <div className="relative">
              <div className="flex flex-row justify-between mb-12">
                <img
                  src="/chip.png"
                  draggable={false}
                  className="block w-1/6 h-auto"
                />
                <img
                  alt={useCardType}
                  src={`/${useCardType}.png`}
                  draggable={false}
                  className=" block w-1/6 h-auto"
                />
              </div>
              <div className="text-white font-bold text-3xl mb-8">
                {cardNumber || "#### #### #### ####"}
              </div>
              <div className="flex flex-row justify-between text-white">
                <div>
                  <label>Card Holder</label>
                  <p className="uppercase font-semibold">{cardName}</p>
                </div>
                <div>
                  <label>Expiration</label>
                  <p>MM/YY</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="text-gray-600 text-sm" htmlFor="cnumber">
                Card Number
              </label>
              <input
                type="tel"
                autoComplete="off"
                className="input"
                maxLength="19"
                id="cnumber"
                name="cnumber"
                placeholder="1111 2222 3333 4444"
                onChange={onCardNumberChange}
                value={cardNumber}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 text-sm" htmlFor="cardname">
                Name
              </label>
              <input
                className="input uppercase"
                name="cardname"
                id="cardname"
                placeholder="John Doe"
                onChange={(e) => setCardName(e.target.value || "FULL NAME")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 text-sm">
                  Expiration (mm/yy)
                </label>
                <input className="input" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Security Code</label>
                <input className="input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
