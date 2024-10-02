CREATE OR REPLACE FUNCTION store_material_after_issue_insert_funct() RETURNS TRIGGER AS $$
BEGIN
  UPDATE
    store.material
    SET
        quantity = quantity - NEW.quantity
        WHERE
        uuid = NEW.material_uuid;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION store_material_after_issue_delete_funct() RETURNS TRIGGER AS $$
BEGIN
  UPDATE
    store.material
    SET
        quantity = quantity + OLD.quantity
        WHERE
        uuid = OLD.material_uuid;
    RETURN OLD;
END;

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION store_material_after_issue_update_funct() RETURNS TRIGGER AS $$
BEGIN
   -- If the material UUID has changed
    IF OLD.material_uuid <> NEW.material_uuid THEN
        -- Add the old quantity back to the old material
        UPDATE store.material
        SET quantity = quantity + OLD.quantity
        WHERE uuid = OLD.material_uuid;

        -- Deduct the new quantity from the new material
        UPDATE store.material
        SET quantity = quantity - NEW.quantity
        WHERE uuid = NEW.material_uuid;
    ELSE
        -- If the material UUID has not changed, just update the quantity
        UPDATE store.material
        SET quantity = quantity + OLD.quantity - NEW.quantity
        WHERE uuid = OLD.material_uuid;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER store_material_after_issue_insert_trigger
AFTER INSERT ON store.issue
FOR EACH ROW
EXECUTE FUNCTION store_material_after_issue_insert_funct();

CREATE OR REPLACE TRIGGER store_material_after_issue_delete_trigger
AFTER DELETE ON store.issue
FOR EACH ROW
EXECUTE FUNCTION store_material_after_issue_delete_funct();

CREATE OR REPLACE  TRIGGER store_material_after_issue_update_trigger
AFTER UPDATE ON store.issue
FOR EACH ROW
EXECUTE FUNCTION store_material_after_issue_update_funct();