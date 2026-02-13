const ContactList = ({ contacts, setContacts, setEditingContact }) => {
  const deleteHandler = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ marginTop: "32px" }}>
      {contacts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          هنوز هیچ مخاطبی ثبت نشده است
        </p>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid #eee",
              marginBottom: "8px",
              background: "#fff",
              borderRadius: "6px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div>
              <strong>
                {contact.name} {contact.lastName}
              </strong>
              <br />
              <small style={{ color: "#555" }}>{contact.mobile}</small>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setEditingContact(contact)}
                style={{
                  background: "#1976d2",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ویرایش
              </button>

              <button
                onClick={() => deleteHandler(contact.id)}
                style={{
                  background: "#d32f2f",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                حذف
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;
