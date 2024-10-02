document.addEventListener('DOMContentLoaded', async () => {
    const mailContainer = document.getElementById('mailContainer');

    try {
        const response = await fetch('https://portfolio-server-spvg.onrender.com/api/mails');
        const mails = await response.json();

        mails.forEach(mail => {
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content');

            const nameDiv = document.createElement('div');
            nameDiv.textContent = `Name: ${mail.name}`;
            contentDiv.appendChild(nameDiv);

            const emailDiv = document.createElement('div');
            emailDiv.textContent = `Email: ${mail.mail}`;
            contentDiv.appendChild(emailDiv);

            const mobileDiv = document.createElement('div');
            mobileDiv.textContent = `Mobile: ${mail.mobile}`;
            contentDiv.appendChild(mobileDiv);

            const subjectDiv = document.createElement('div');
            subjectDiv.textContent = `Subject: ${mail.subject}`;
            contentDiv.appendChild(subjectDiv);

            const messageDiv = document.createElement('div');
            messageDiv.textContent = `Message: ${mail.message}`;
            contentDiv.appendChild(messageDiv);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                try {
                    const deleteResponse = await fetch(`https://portfolio-server-spvg.onrender.com/api/mails/${mail._id}`, {
                        method: 'DELETE',
                    });
                    if (deleteResponse.ok) {
                        mailContainer.removeChild(contentDiv);
                    } else {
                        alert('Error deleting mail.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error deleting mail.');
                }
            });
            contentDiv.appendChild(deleteButton);

            mailContainer.appendChild(contentDiv);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
