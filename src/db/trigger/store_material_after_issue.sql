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
  UPDATE
    store.material
    SET
        quantity = quantity + OLD.quantity - NEW.quantity
        WHERE
        uuid = NEW.material_uuid;
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