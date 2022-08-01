"""Create Project Table with Association Table

Revision ID: 68e4cb0f5075
Revises: 9b2a11c6ecdf
Create Date: 2022-07-22 13:40:27.938900

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.types import DateTime


# revision identifiers, used by Alembic.
revision = '68e4cb0f5075'
down_revision = '9b2a11c6ecdf'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "Project",
        sa.Column("projectId", sa.Integer, primary_key=True),
        sa.Column("projectName", sa.String(50), nullable=False),
        sa.Column("nameOfLeader", sa.String(50)),
        sa.Column("description", sa.String(100)),
        sa.Column("createdAtTime", sa.DateTime(timezone=False)),
        sa.Column("updatedAtTime", sa.DateTime(timezone=False)),
    ),
    op.create_table(
        "User_Project",
        sa.Column("userId",sa.Integer,ForeignKey("User.id"), primary_key=True),
        sa.Column("projectId",sa.Integer,ForeignKey("Project.projectId"), primary_key=True),
        sa.Column("extraData",sa.String(100)),

    )
    pass


def downgrade():
    op.drop_table("User_Project"),
    op.drop_table("Project"),
    pass
