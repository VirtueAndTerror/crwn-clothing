import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

/* We destructure the collection property form mapStateToProps
which includes the match property from our Router*/
const CollectionPage = ({ collection }) => {
	const { title, items } = collection;

	return (
		<div className='collection-page'>
			<h2 className='title'>{title.toUpperCase()}</h2>
			<div className='items'>
				{items.map(item => (
					<CollectionItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

// ownProps are the props of the component we are wrapping in our connect().
const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
