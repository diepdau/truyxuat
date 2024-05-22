
const Counter = ({ count }) => {
  return <span>Bạn có chắc chắn muốn xóa {count}</span>
}

const MultiplyCountDecorator = (counter) => {
  return ({ count, ...props }) => {
    return counter({ count: 2 * count, ...props })
  }
}

const DecoratedCounter = MultiplyCountDecorator(Counter);

export default DecoratedCounter;
