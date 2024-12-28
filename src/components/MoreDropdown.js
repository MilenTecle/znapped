import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ConfirmationModal from "./ConfirmationModal";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

/**
 * Provides edit and delete options for posts and comments
 * A confirmation modal is triggered before any delete action
 */
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  // Function to handle confirmation of delete action
  const handleConfirmDelete = () => {
    setShowModal(false);
    handleDelete();
  };

  return (
    <>
      <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={ThreeDots} />

        <Dropdown.Menu
          className="text-center"
          popperConfig={{ strategy: "fixed" }}
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit"
          >
            <i className="fas fa-edit" />
          </Dropdown.Item>
          {/* Delete option triggers the confirmation modal */}
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => setShowModal(true)}
            aria-label="delete"
          >
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Confirmation modal for delete action */}
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </>
  );
};

/**
 * Custom "Three Dots" icon for delete option for messages and notifications.
 * A confirmation modal is triggered before any delete action
 */
export const NotificationsDeleteDropdown = ({ handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  // Function to handle confirmation of delete action
  const handleConfirmDelete = () => {
    setShowModal(false);
    handleDelete();
  };

  return (
    <>
      <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={ThreeDots} />

        <Dropdown.Menu
          className="text-center"
          popperConfig={{ strategy: "fixed" }}
        >
          {/* Delete option triggers the confirmation modal */}
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => setShowModal(true)}
            aria-label="delete"
          >
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Confirmation modal for delete action */}
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this notification?"
      />
    </>
  );
};

// Custom "Three Dots" icon to edit the Profile"
export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
