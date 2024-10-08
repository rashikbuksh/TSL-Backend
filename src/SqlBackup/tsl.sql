PGDMP                  	    |            tsl    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    417208    tsl    DATABASE     ~   CREATE DATABASE tsl WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE tsl;
                postgres    false                        2615    417209    drizzle    SCHEMA        CREATE SCHEMA drizzle;
    DROP SCHEMA drizzle;
                postgres    false                        2615    417219    hr    SCHEMA        CREATE SCHEMA hr;
    DROP SCHEMA hr;
                postgres    false            �            1259    417211    migrations_details    TABLE     t   CREATE TABLE drizzle.migrations_details (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);
 '   DROP TABLE drizzle.migrations_details;
       drizzle         heap    postgres    false    6            �            1259    417210    migrations_details_id_seq    SEQUENCE     �   CREATE SEQUENCE drizzle.migrations_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE drizzle.migrations_details_id_seq;
       drizzle          postgres    false    218    6            �           0    0    migrations_details_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE drizzle.migrations_details_id_seq OWNED BY drizzle.migrations_details.id;
          drizzle          postgres    false    217            �            1259    417220 
   department    TABLE     �   CREATE TABLE hr.department (
    uuid text NOT NULL,
    department text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone,
    remarks text
);
    DROP TABLE hr.department;
       hr         heap    postgres    false    7            �            1259    417227    designation    TABLE     �   CREATE TABLE hr.designation (
    uuid text NOT NULL,
    designation text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone,
    remarks text
);
    DROP TABLE hr.designation;
       hr         heap    postgres    false    7            �            1259    417234    policy_and_notice    TABLE       CREATE TABLE hr.policy_and_notice (
    uuid text NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    sub_title text NOT NULL,
    url text NOT NULL,
    created_by text,
    created_at text NOT NULL,
    updated_at text,
    status integer NOT NULL,
    remarks text
);
 !   DROP TABLE hr.policy_and_notice;
       hr         heap    postgres    false    7            �            1259    417241    users    TABLE     C  CREATE TABLE hr.users (
    uuid text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    pass text NOT NULL,
    designation_uuid text,
    can_access text,
    ext text,
    phone text,
    created_at text NOT NULL,
    updated_at text,
    status text DEFAULT 0,
    remarks text,
    department_uuid text
);
    DROP TABLE hr.users;
       hr         heap    postgres    false    7            ,           2604    417214    migrations_details id    DEFAULT     �   ALTER TABLE ONLY drizzle.migrations_details ALTER COLUMN id SET DEFAULT nextval('drizzle.migrations_details_id_seq'::regclass);
 E   ALTER TABLE drizzle.migrations_details ALTER COLUMN id DROP DEFAULT;
       drizzle          postgres    false    218    217    218            �          0    417211    migrations_details 
   TABLE DATA           C   COPY drizzle.migrations_details (id, hash, created_at) FROM stdin;
    drizzle          postgres    false    218   ^"       �          0    417220 
   department 
   TABLE DATA           S   COPY hr.department (uuid, department, created_at, updated_at, remarks) FROM stdin;
    hr          postgres    false    219   �"       �          0    417227    designation 
   TABLE DATA           U   COPY hr.designation (uuid, designation, created_at, updated_at, remarks) FROM stdin;
    hr          postgres    false    220   (#       �          0    417234    policy_and_notice 
   TABLE DATA              COPY hr.policy_and_notice (uuid, type, title, sub_title, url, created_by, created_at, updated_at, status, remarks) FROM stdin;
    hr          postgres    false    221   m#       �          0    417241    users 
   TABLE DATA           �   COPY hr.users (uuid, name, email, pass, designation_uuid, can_access, ext, phone, created_at, updated_at, status, remarks, department_uuid) FROM stdin;
    hr          postgres    false    222   �#       �           0    0    migrations_details_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('drizzle.migrations_details_id_seq', 2, true);
          drizzle          postgres    false    217            /           2606    417218 *   migrations_details migrations_details_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY drizzle.migrations_details
    ADD CONSTRAINT migrations_details_pkey PRIMARY KEY (id);
 U   ALTER TABLE ONLY drizzle.migrations_details DROP CONSTRAINT migrations_details_pkey;
       drizzle            postgres    false    218            1           2606    417226    department department_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY hr.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (uuid);
 @   ALTER TABLE ONLY hr.department DROP CONSTRAINT department_pkey;
       hr            postgres    false    219            3           2606    417233    designation designation_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY hr.designation
    ADD CONSTRAINT designation_pkey PRIMARY KEY (uuid);
 B   ALTER TABLE ONLY hr.designation DROP CONSTRAINT designation_pkey;
       hr            postgres    false    220            5           2606    417240 (   policy_and_notice policy_and_notice_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY hr.policy_and_notice
    ADD CONSTRAINT policy_and_notice_pkey PRIMARY KEY (uuid);
 N   ALTER TABLE ONLY hr.policy_and_notice DROP CONSTRAINT policy_and_notice_pkey;
       hr            postgres    false    221            7           2606    417250    users users_email_unique 
   CONSTRAINT     P   ALTER TABLE ONLY hr.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
 >   ALTER TABLE ONLY hr.users DROP CONSTRAINT users_email_unique;
       hr            postgres    false    222            9           2606    417248    users users_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY hr.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);
 6   ALTER TABLE ONLY hr.users DROP CONSTRAINT users_pkey;
       hr            postgres    false    222            :           2606    417256 <   policy_and_notice policy_and_notice_created_by_users_uuid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY hr.policy_and_notice
    ADD CONSTRAINT policy_and_notice_created_by_users_uuid_fk FOREIGN KEY (created_by) REFERENCES hr.users(uuid);
 b   ALTER TABLE ONLY hr.policy_and_notice DROP CONSTRAINT policy_and_notice_created_by_users_uuid_fk;
       hr          postgres    false    221    4665    222            ;           2606    417266 .   users users_department_uuid_department_uuid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY hr.users
    ADD CONSTRAINT users_department_uuid_department_uuid_fk FOREIGN KEY (department_uuid) REFERENCES hr.department(uuid);
 T   ALTER TABLE ONLY hr.users DROP CONSTRAINT users_department_uuid_department_uuid_fk;
       hr          postgres    false    4657    222    219            <           2606    417261 0   users users_designation_uuid_designation_uuid_fk    FK CONSTRAINT     �   ALTER TABLE ONLY hr.users
    ADD CONSTRAINT users_designation_uuid_designation_uuid_fk FOREIGN KEY (designation_uuid) REFERENCES hr.designation(uuid);
 V   ALTER TABLE ONLY hr.users DROP CONSTRAINT users_designation_uuid_designation_uuid_fk;
       hr          postgres    false    222    4659    220            �   u   x�Eͻ1�x]G�'����� "��_C{�[Ie�,���3>:�ve����ϓ�T����ƞ��
S�X�qU���������Tgn	������z��Z��(r      �   5   x��Lw1(�t��
��JM-�tL����4202�5 !+0�*������ {��      �   5   x��Lw1(�t��
��JM-�tL����4202�5 !+0�*������ {��      �      x������ � �      �   5  x���aK�0�?��BB?֮�0�>9+s*'!M�&�%mzU���݆̹uL����=��\d��?:���QD���c3�,R��P��3�	c'��)_: f���f���i�[���C�h�]�%�z� ��V��iK�,#��51u_�ᄡ7��3��a�`��3D�ž*�K8�*q��T͍�T	.3F���ҫ�]W�hs�"�S^%����'�.����83���V?�
�ֶ<R�l_��ym�7�1*��+0�p{q���«�U�܄~YAx�Z��~g��]�^-�&���ٞx�mt��     