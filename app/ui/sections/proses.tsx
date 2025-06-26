export default function Steps() {
  return (
    <section className="bg-bakery-cream py-16" id="process">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-10 text-center font-semibold">How it works</h2>

        <ul>
          <li className="mb-8 flex items-center justify-between p-6">
            <h2>step 1</h2>{' '}
            <span className="basis-3/4 text-left text-lg md:text-3xl">
              Choose your cake
            </span>
          </li>
          <li className="mb-8 flex items-center justify-between p-6">
            <h2>step 2</h2>{' '}
            <span className="basis-3/4 text-left text-lg md:text-3xl">
              Pick your date
            </span>
          </li>
          <li className="mb-8 flex items-center justify-between p-6">
            <h2>step 3</h2>{' '}
            <span className="basis-3/4 text-left text-lg md:text-3xl">
              Book & pay deposit
            </span>
          </li>
          <li className="mb-8 flex items-center justify-between p-6">
            <h2>step 4</h2>{' '}
            <span className="basis-3/4 text-left text-lg md:text-3xl">
              Get a confirmation e-mail
            </span>
          </li>
          <li className="mb-8 flex items-center justify-between p-6">
            <h2>step 5</h2>{' '}
            <span className="basis-3/4 text-left text-lg md:text-3xl">
              Wait for your delivery
            </span>
          </li>
        </ul>

        <div className="mt-12 flex justify-center">
          <button className="bg-bakery-primary text-bakery-background rounded-full px-8 py-3 text-lg font-medium transition hover:brightness-110">
            Start now
          </button>
        </div>
      </div>
    </section>
  );
}
