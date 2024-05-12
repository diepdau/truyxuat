const fruits = ["Bananas", "Apples", "Strawberries", "Grapes", "Oranges"]
export function FruitList() {
  return (
    <section>
      <h1 id="fruits-heading">Fruits</h1>
      <ul aria-labelledby="fruits-heading">
        {fruits.map(fruit => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </section>
  )
}