async function fetchMessages() {
  try {
    const response = await fetch("js/messages.json");
    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

// Function to display messages on the screen
async function displayMessages() {
  const messages = await fetchMessages();
  const chatContainer = document.getElementById("chat-container");
  let htmlContent = "";

  messages.forEach((message, index) => {
    const messageClass = message.sender === "~ You" ? "sent" : "received";
    htmlContent += `
            <div class="message-box ${messageClass}">
                <div class="message-user">
                <img src="${message.placeholder}" alt="profileimg" /> 
                <span>${message.sender}</span>
                </div>
                <div class="message-container ">
                   <div> ${message.message} </div>
                   <span> ${message.timestamp}</span>
                </div>
            </div>
            `;
  });

  chatContainer.innerHTML = htmlContent;
}

async function fetchContacts() {
  try {
    const response = await fetch("js//contacts.json");
    const contacts = response.json();
    return contacts;
  } catch (error) {
    console.log("Error fetching Contacts:", error);
  }
}

//function to display contacts list
async function displayContacts() {
  const contacts = await fetchContacts();
  const contactsContainer = document.querySelector(".contacts");

  let contactsHtml = "";

  contacts.forEach((contact, index) => {
    let status = "";
    if (contact.lastonline > 0) {
      if (contact.lastonline < 60) {
        status = `Seen ${contact.lastonline} minutes ago`;
      } else {
        let hours = Math.floor(contact.lastonline / 60);
        status = `Seen ${hours} hours ago`;
      }
    } else {
      status = `<span class="green">Online</span>`;
    }

    contactsHtml += `
        <div class="contact-box">
                <img src="${contact.placeholderpic}" alt="profileimg">
                <div class="contact-details">
                   <p>${contact.name}</p>
                     <span>${status}</span>
                </div>
               </div>
        `;
  });

  contactsContainer.innerHTML = contactsHtml;
}

const navToggle = document.querySelector(".hidden");
const sidebar = document.querySelector(".sidebar");

navToggle.addEventListener("click", function (event) {
  event.stopPropagation();
  sidebar.classList.toggle("show_nav");
});

// Close the sidebar when clicking outside of it
document.body.addEventListener("click", function () {
  sidebar.classList.remove("show_nav");
});

// Prevents clicks inside the sidebar from closing it
sidebar.addEventListener("click", function (event) {
  event.stopPropagation();
});

displayMessages();
displayContacts();
