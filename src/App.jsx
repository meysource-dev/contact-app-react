import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Form from "./components/Form";
import ContactList from "./components/ContactList";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) => {
    const queryLower = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(queryLower) ||
      contact.lastName.toLowerCase().includes(queryLower) ||
      contact.mobile.includes(queryLower)
    );
  });
  const handleFocusForm = () => {
    setSearchQuery("");
  };
  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>مدیریت مخاطبین</h1>

      <Form
        setContacts={setContacts}
        editingContact={editingContact}
        setEditingContact={setEditingContact}
        onFocusInput={handleFocusForm}
      />
      
      <div style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="جستجو بر اساس نام، نام خانوادگی یا موبایل..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Form
              setContacts={setContacts}
              editingContact={editingContact}
              setEditingContact={(newVal) => {
                setEditingContact(newVal);
                setIsModalOpen(false);
              }}
              onFocusInput={handleFocusForm}
            />
          </div>
        </div>
      )}

      <ContactList
        contacts={filteredContacts}
        setContacts={setContacts}
        setEditingContact={(contact) => {
          setEditingContact(contact);
          setIsModalOpen(true);
        }}
      />

      {filteredContacts.length === 0 && searchQuery && (
        <p style={{ textAlign: "center", color: "#d32f2f", marginTop: "16px" }}>
          هیچ مخاطبی با جستجوی "{searchQuery}" پیدا نشد
        </p>
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
