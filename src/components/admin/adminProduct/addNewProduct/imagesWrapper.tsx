import * as React from 'react';

interface ImageItemProps {
    url?: string;
    index: number;
    img: any;
    removePreivewImg: any;
    setFirstPreviewImg: any;
}

const ImageItem = ({
    url,
    index,
    img,
    removePreivewImg,
    setFirstPreviewImg
}: ImageItemProps) => {
    return (
        <div
            className="admin-image-item"
            style={{ backgroundImage: ` url(${url})` }}
        >
            <div className="admin-image-item-cover">
                {' '}{index === 0
                    ? ''
                    : <i
                          className="fa fa-home"
                          aria-hidden="true"
                          onClick={() => {
                              setFirstPreviewImg(img);
                          }}
                      />}{' '}
                <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => {
                        removePreivewImg(img);
                    }}
                />
            </div>
        </div>
    );
};

interface ImagesData {
    file: any;
    result: string;
}

interface ImagesWrapperProps {
    data?: ImagesData[];
    removePreivewImg: any;
    setFirstPreviewImg: any;
}

const ImagesWrapper = ({
    data,
    removePreivewImg,
    setFirstPreviewImg
}: ImagesWrapperProps) => {
    const renderImageItems = data
        ? data.map((img: any, i: number) => {
              return (
                  <ImageItem
                      url={img.result}
                      key={i}
                      index={i}
                      img={img}
                      removePreivewImg={removePreivewImg}
                      setFirstPreviewImg={setFirstPreviewImg}
                  />
              );
          })
        : '';
    return (
        <div className="admin-image-wrapper">
            {renderImageItems}
        </div>
    );
};

export default ImagesWrapper;
