"""Create User Table

Revision ID: 9b2a11c6ecdf
Revises: 
Create Date: 2022-07-22 13:38:58.933803

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b2a11c6ecdf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'User',
        sa.Column('id',sa.Integer,primary_key=True),
        sa.Column('username',sa.String(50)),
        sa.Column('firstname',sa.String(50)),
        sa.Column('lastname',sa.String(50)),
        sa.Column('email',sa.String(100),nullable=False),
        sa.Column('cellphone',sa.String(50)),
        sa.Column('companyname',sa.String(50)),
        sa.Column('password_hash',sa.String(100),nullable=False),
        sa.Column('is_active',sa.Boolean,nullable=False),
        sa.Column('is_superuser',sa.Boolean,nullable=False),
        sa.Column('is_leader',sa.Boolean,nullable=False),
    )
    pass


def downgrade():
    op.drop_table('User')
    pass
