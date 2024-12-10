let commentCount = 0;

// Carregar comentários salvos do Local Storage
function loadComments() {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.forEach(comment => {
        addCommentToList(comment);
    });
    commentCount = savedComments.length;
    document.getElementById('comment-count').innerText = commentCount;
}

// Adicionar um novo comentário à lista
function addComment() {
    const name = document.getElementById('name').value.trim();
    const titulo = document.getElementById('titulo').value.trim();
    const email = document.getElementById('email').value.trim();
    const commentText = document.getElementById('comment').value.trim();

    // Regex para validar o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação dos campos
    if (!name || !titulo || !email || !commentText) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido com "@" e domínio.');
        return;
    }

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    const newComment = {
        id: Date.now(),
        name,
        titulo,
        email,
        commentText,
        date: formattedDate
    };

    addCommentToList(newComment);

    // Salvar comentário no Local Storage
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(savedComments));

    commentCount++;
    document.getElementById('comment-count').innerText = commentCount;

    // Limpar campos após adicionar o comentário
    document.getElementById('name').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('email').value = '';
    document.getElementById('comment').value = '';
}

// Adicionar um comentário à lista na página
function addCommentToList(comment) {
    const commentList = document.getElementById('comments-list');
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.setAttribute('data-id', comment.id); 
    newComment.innerHTML = `
        <div class="comment-content">
            <p><strong>${comment.name}</strong> - ${comment.titulo} (${comment.email}) <span class="date-time">(${comment.date})</span></p>
            <p>${comment.commentText}</p>
        </div>
        <button class="remove-button" onclick="removeComment(${comment.id})">Remover</button>
    `;
    commentList.appendChild(newComment);
}






// Remover um comentário da lista e do Local Storage
function removeComment(commentId) {
    const commentList = document.getElementById('comments-list');
    const commentToRemove = document.querySelector(`[data-id='${commentId}']`);

    if (commentToRemove) {
        commentList.removeChild(commentToRemove);

        // Atualizar Local Storage
        const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
        const updatedComments = savedComments.filter(comment => comment.id !== commentId);
        localStorage.setItem('comments', JSON.stringify(updatedComments));

        commentCount--;
        document.getElementById('comment-count').innerText = commentCount;
    } else {
        alert('Comentário não encontrado para remover.');
    }
}



// Carregar comentários ao inicializar a página
window.onload = loadComments;

// Função para rolar para o topo da página com animação
function scrollToTop(event) {
    event.preventDefault(); // Evitar o comportamento padrão do link
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
