import IBlogpost from './interfaces/IBlogpost';

class Blogpost implements IBlogpost {
	id = '';
	author_id = '';
	title = '';
	content = '';
	created_at = new Date();
	updated_at = new Date();
}

export default Blogpost;
