document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('contactForm');
    //?const submitBtn = document.querySelector('.submitBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        //? en comments Збираємо дані форми
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Створюємо об'єкт для відправки
        const formData = {
            name,
            mail: email,
            mobile,
            subject,
            message
        };

        try {
            // Відправляємо дані на сервер
            const response = await fetch('https://portfolio-server-spvg.onrender.com/main/api/mails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                alert('Ваше повідомлення було успішно відправлено!');
                form.reset(); // Очищення форми після успішного відправлення
            } else {
                console.error('Error:', response.statusText);
                alert('Виникла помилка при відправленні повідомлення. Спробуйте ще раз.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Виникла помилка при відправленні повідомлення. Спробуйте ще раз.');
        }
    });
});
