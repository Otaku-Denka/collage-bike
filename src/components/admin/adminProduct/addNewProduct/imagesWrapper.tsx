import * as React from 'react';

interface ImageItemProps {
    url?: string;
}

const ImageItem = ({ url }: ImageItemProps) => {
    return (
        <div
            className="admin-image-item"
            style={{ backgroundImage: ` url(${url})` }}
        />
    );
};

interface ImagesData {
    file: any;
    result: string;
}

interface ImagesWrapperProps {
    data?: ImagesData[];
}

const ImagesWrapper = ({ data }: ImagesWrapperProps) => {
    const renderImageItems = data
        ? data.map((img: any, i: number) => {
              return <ImageItem url={img.result} key={i} />;
          })
        : '';
    return (
        <div className="admin-image-wrapper">
            {renderImageItems}
        </div>
    );
};

export default ImagesWrapper;
