import { PhoneIcon } from "@chakra-ui/icons";

const Homepage = () => {
  const user = {
    name: "John",
    contacts: [
      {
        name: "amir",
        phoneNumber: "123123",
      },
    ],
  };

  function handleCall(contact) {
    console.log("Calling", contact.name);
  }

  return (
    <>
      Hello {user.name}
      {user.contacts.map((contact) => {
        return (
          <div key={contact.phoneNumber} onClick={() => handleCall(contact)}>
            {user.name} <PhoneIcon />
          </div>
        );
      })}
    </>
  );
};

export default Homepage;
