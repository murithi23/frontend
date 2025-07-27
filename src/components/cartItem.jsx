import { Button } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CartItem = ({ item, removeItem, updateQuantity }) => {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center p-3">
          <img
            src={item.image || '/placeholder-product.jpg'}
            alt={item.name}
            className="rounded me-3"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
          <div>
            <h5 className="mb-1">{item.name}</h5>
            <Button
              variant="link"
              size="sm"
              className="text-danger p-0"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name}`}
            >
              <FaTrash className="me-1" />
              Remove
            </Button>
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <div className="d-flex align-items-center justify-content-center">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <FaMinus />
          </Button>
          <span className="mx-3">{item.quantity}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <FaPlus />
          </Button>
        </div>
      </td>
      <td className="align-middle text-end">${item.price.toFixed(2)}</td>
      <td className="align-middle text-end">${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired
};

export default CartItem;