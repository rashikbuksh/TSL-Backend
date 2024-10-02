CREATE OR REPLACE FUNCTION store_material_after_receive_entry_insert_funct() RETURNS TRIGGER AS $$
BEGIN
    UPDATE store.material
     SET 
        quantity = quantity + NEW.quantity 
        WHERE uuid = NEW.material_uuid; 
    RETURN NEW;
END;

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION store_material_after_receive_entry_delete_funct() RETURNS TRIGGER AS $$
BEGIN
    UPDATE store.material
     SET 
        quantity = quantity - OLD.quantity 
        WHERE uuid = OLD.material_uuid; 
    RETURN OLD;
END;

$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION store_material_after_receive_entry_update_funct() RETURNS TRIGGER AS $$
BEGIN
     IF OLD.material_uuid <> NEW.material_uuid THEN
        -- Deduct the old quantity from the old material
        UPDATE store.material
        SET quantity = quantity - OLD.quantity
        WHERE uuid = OLD.material_uuid;

        -- Add the new quantity to the new material
        UPDATE store.material
        SET quantity = quantity + NEW.quantity
        WHERE uuid = NEW.material_uuid;
    ELSE
        -- If the material UUID has not changed, just update the quantity
        UPDATE store.material
        SET quantity = quantity - OLD.quantity + NEW.quantity
        WHERE uuid = OLD.material_uuid;
    END IF;
    RETURN NEW;
END;

$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER store_material_after_receive_entry_insert_trigger
AFTER INSERT ON store.receive_entry
FOR EACH ROW
EXECUTE FUNCTION store_material_after_receive_entry_insert_funct();

CREATE OR REPLACE TRIGGER store_material_after_receive_entry_delete_trigger
AFTER DELETE ON store.receive_entry
FOR EACH ROW
EXECUTE FUNCTION store_material_after_receive_entry_delete_funct();

CREATE OR REPLACE TRIGGER store_material_after_receive_entry_update_trigger
AFTER UPDATE ON store.receive_entry
FOR EACH ROW
EXECUTE FUNCTION store_material_after_receive_entry_update_funct();


