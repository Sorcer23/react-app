import React, { Fragment, useEffect } from "react";
import {
  withHandlers,
  compose,
  withPropsOnChange,
  withStateHandlers
} from "recompose";

import withField from "HOC/withField";
import EntityPreview from "./EntityPreview";
import AddNew from "./AddNew";

function SelectProviderEntity(props) {
  const {
    apiGetList,
    previewImagesName,
    error,
    placeholder,
    listPlaceholder,
    selectedEntities,
    maxSize,
    exceptValue,
    onDelete,
    onAdd
  } = props;

  useEffect(() => {
    props.form.setFieldTouched(props.field.name);
  }, []);

  return (
    <Fragment>
      {selectedEntities.map(entity => (
        <div key={entity.id} className="col-md-3">
          <EntityPreview
            onDelete={onDelete}
            entity={entity}
            previewImagesName={previewImagesName}
          />
        </div>
      ))}
      {(maxSize == null || maxSize > selectedEntities.length) && (
        <div className="col-md-3">
          <AddNew
            placeholder={placeholder}
            listPlaceholder={listPlaceholder}
            selectedEntities={selectedEntities}
            previewImagesName={previewImagesName}
            apiGetList={apiGetList}
            exceptValue={exceptValue}
            error={error}
            onAdd={onAdd}
          />
        </div>
      )}
    </Fragment>
  );
}

export default compose(
  withStateHandlers(
    ({ initialEntities = [] }) => {
      return { selectedEntities: initialEntities };
    },
    {
      initSelectedEntities: ({}, { initialEntities }) => () => {
        return { selectedEntities: initialEntities };
      },
      addSelectedEntity: ({ selectedEntities }) => entity => {
        return { selectedEntities: [...selectedEntities, entity] };
      },
      deleteSelectedEntity: ({ selectedEntities }) => deletedEntity => {
        return {
          selectedEntities: selectedEntities.filter(
            entity => entity.id !== deletedEntity.id
          )
        };
      }
    }
  ),
  withPropsOnChange(["initialEntities"], props => {
    props.initSelectedEntities();
  }),
  withField,
  withHandlers({
    onDelete: props => entity => {
      const { form, field, deleteSelectedEntity } = props;
      form.setFieldValue(
        field.name,
        field.value.filter(entityId => entityId !== entity.id)
      );
      deleteSelectedEntity(entity);
    },
    onAdd: props => entity => {
      const { form, field, addSelectedEntity } = props;
      form.setFieldValue(field.name, [...field.value, entity.id]);
      addSelectedEntity(entity);
    }
  })
)(SelectProviderEntity);

SelectProviderEntity.defaultProps = {
  initialEntities: []
};
