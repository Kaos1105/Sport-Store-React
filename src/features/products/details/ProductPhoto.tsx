import React, { useContext, useState } from 'react';
import { Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import PhotoUploadWidget from '../../../app/common/photoUpload/PhotoUploadWidget';

const ProductPhoto = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    selectedProduct,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    setMainLoading,
    deletePhoto,
  } = rootStore.productStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [mainTarget, setMainTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined);

  const handleUploadImage = (photo: Blob, productId: string) => {
    uploadPhoto(photo, productId).then(() => setAddPhotoMode(false));
  };

  return (
    <Grid>
      <Grid.Column width={16} style={{ paddingBottom: 0 }}>
        <Header floated='left' icon='image' color='teal' content='Photos' />
        <Button
          floated='right'
          basic
          color='blue'
          content={addPhotoMode ? 'Cancel' : 'Add Photo'}
          onClick={() => setAddPhotoMode(!addPhotoMode)}
        />
      </Grid.Column>
      <Grid.Column width={16}>
        {addPhotoMode ? (
          <PhotoUploadWidget
            productId={selectedProduct?.id!}
            uploadPhoto={handleUploadImage}
            loading={uploadingPhoto}
          />
        ) : (
          <Card.Group itemsPerRow='3' stackable={true}>
            {selectedProduct &&
              selectedProduct.photos.map((photo, index) => (
                <Card key={index}>
                  <Image src={photo.url} />
                  <Button.Group widths={2}>
                    <Button
                      name={photo.id}
                      onClick={(e) => {
                        setMainPhoto(photo);
                        setMainTarget(e.currentTarget.name);
                      }}
                      disabled={photo.main}
                      loading={setMainLoading && mainTarget === photo.id}
                      basic
                      positive
                      content='Main'
                    />
                    <Button
                      name={photo.id}
                      disabled={photo.main}
                      onClick={(e) => {
                        deletePhoto(photo);
                        setDeleteTarget(e.currentTarget.name);
                      }}
                      loading={setMainLoading && deleteTarget === photo.id}
                      basic
                      negative
                      icon='trash'
                    />
                  </Button.Group>
                </Card>
              ))}
          </Card.Group>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductPhoto);
